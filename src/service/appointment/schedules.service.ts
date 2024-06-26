import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { ScheduleEntity } from 'src/entity/appointment/schedules.entity';
import { Profile } from 'src/entity/profile/profile.entity';
import { ScheduleDoctorEntity } from 'src/entity/appointment/schedules_doctor';
import { Doctor } from 'src/entity/clinic/doctor.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleReposity: Repository<ScheduleEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(ScheduleDoctorEntity)
    private readonly scheduleDoctorReposity: Repository<ScheduleDoctorEntity>,
  ) {}

  async getAll(token: string, doctor_id: number, date: Date) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let records: ScheduleDoctorEntity[] | null = null;

      if (doctor_id && date) {
        records = await this.scheduleDoctorReposity.find({
          where: {
            date: date,
            doctor_id: doctor_id,
          },
          select: ["time"],
        });
      } else if (doctor_id) {
        records = await this.scheduleDoctorReposity.find({
          where: {
            doctor_id: doctor_id,
          },
          select: ["time"],
        });
      } else if (date) {
        records = await this.scheduleDoctorReposity.find({
          where: {
            date: date,
          },
          select: ["time"],
        });
      } else {
        records = await this.scheduleDoctorReposity.find({
          where: {
            date: today,
          },
          select: ["time"],
        });
      }

      if (records && records.length > 0) {
        return {
          status: true,
          message: 'Success ambil data schedule',
          data: {
            date: true,
            time: records
          },
        };
      } else {
        return {
          status: false,
          message: 'tidak ada data yang berhasil di ambil',
          data: {
            date: false,
            time: null
          },
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: {
          date: false,
          time: null
        },
      };
    }
  }

  async getToken(token: string) {
    try {
        const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
            const userId = extracttoken.userId;

            const records = await this.scheduleReposity.find({
                where: {
                    user_id: userId,
                },
                select: ["code", "doctor_id", "approval"],
            });

            if (records.length > 0) {
                return {
                    status: true,
                    message: 'Success ambil data approval token',
                    data: {
                        records
                    },
                };
            } else {
                return {
                    status: false,
                    message: 'Tidak ada data yang berhasil di ambil',
                    data: null,
                };
            }
        } else {
            return {
                status: false,
                message: 'Invalid token',
                data: null,
            };
        }
    } catch (error) {
        console.error('Error in getToken method:', error);
        return {
            status: false,
            message: 'Kesalahan!!, error to retrieve data.',
            data: null,
        };
    }
}

  async Create(token: string, createData: Partial<ScheduleEntity>, clinic_name: string, poly_name: string) {
    try {
        const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
            const userId = extracttoken.userId;

            // Check for duplicate data
            const Checkdatadouble = await this.scheduleReposity.findOne({
                where: { time: createData.time },
            });

            if (Checkdatadouble) {
                return {
                    status: false,
                    message: 'Data sudah tersedia.',
                    data: null
                };
            }

            const latestSchedule = await this.scheduleReposity.findOne({
              where: {}, 
              order: { id: 'DESC' },
            });

            const latestCode = latestSchedule?.code ?? '';
            const codePrefix = `E${clinic_name}${poly_name}`;
            let increment = 1;

            if (latestCode.startsWith(codePrefix)) {
                const numericPart = latestCode.substring(codePrefix.length);
                increment = parseInt(numericPart, 10) + 1;
            }

            const format_increment = increment.toString().padStart(3, '0');
            const get_code = `${codePrefix}${format_increment}`;

            // Create and save schedule
            const ScheduleCreate = this.scheduleReposity.create({
                code: get_code,
                doctor_id: createData.doctor_id,
                approval: false,
                user_id: userId,
                date: createData.date,
                time: createData.time,
            });
            const save = await this.scheduleReposity.save(ScheduleCreate);

            const get_profile_doctor = await this.doctorRepository.findOne({
                where: { id: createData.doctor_id }, 
            });

            if (save) {
                return {
                    status: true,
                    message: 'Data berhasil ditambahkan.',
                    data: {
                        code: get_code,
                        doctor_id: createData.doctor_id,
                        doctor: get_profile_doctor
                    }
                };
            } else {
                return {
                    status: false,
                    message: 'Kesalahan!!, error to create new data.',
                    data: null
                };
            }
        } else {
            return {
                status: false,
                message: 'Invalid token',
                data: null,
            };
        }
    } catch (error) {
        console.error('Error in Create method:', error);
        return {
            status: false,
            message: 'Kesalahan!!, error to create new data.',
            data: null
        };
    }
}


  async ApprovalToken(token: string,createData: Partial<ScheduleEntity>,code: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const CheckDatas = await this.scheduleReposity.findOne({
        where: {
          code: code,
          doctor_id: createData.doctor_id,
        },
      });

      if(!CheckDatas) {
        return {
          status: false,
          message: 'Kesalahan!!, error to create new data.',
          data: null
        };
      }

      CheckDatas.approval = createData.approval;

      const save = await this.scheduleReposity.save(CheckDatas);
      
      const get_profile_doctor = this.profileRepository.findOne({
        where: { user_id: save.id },
      });

      if(save){
        return {
            status: true,
            message: 'Data berhasil di tambah.',
            data: {
              code: save.code,
              doctor_id: save.doctor_id,
              doctor: {
                get_profile_doctor
              }
            }
          };
      } else {
        return {
            status: false,
            message: 'Kesalahan!!, error to create new data.',
            data: null
          };
      }

    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async Update(token: string,updateData: Partial<ScheduleEntity>) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const Checkdatadouble = await this.scheduleReposity.findOne({
        where: { time: updateData.time },
      });

      if (!Checkdatadouble) {
        return {
          status: false,
          message: 'Data sudah tersedia.',
          data: null
        };
      }

      const checkData = await this.scheduleReposity.findOne({
        where: { id: updateData.id },
      });

      Object.assign(checkData, updateData);

      const save = await this.scheduleReposity.save(checkData);

      if(save){
        return {
            status: true,
            message: 'Data berhasil di ubah.',
            data: save
          };
      } else {
        return {
            status: false,
            message: 'Kesalahan!!, error to update data.',
            data: null
          };
      }

    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async SetTime(token: string, createData: Partial<ScheduleDoctorEntity>) {
    try {
        const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
            const userId = extracttoken.userId;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            for (const timeSlot of createData.time) {
                const checkdata = await this.scheduleDoctorReposity.findOne({
                    where: {
                        doctor_id: createData.doctor_id,
                        date: createData.date,
                        time: timeSlot,
                    }
                });

                if (!checkdata) {
                    const scheduleCreate = this.scheduleDoctorReposity.create({
                        doctor_id: createData.doctor_id,
                        date: createData.date,
                        time: timeSlot,
                    });

                    const save = await this.scheduleDoctorReposity.save(scheduleCreate);

                    if (!save) {
                        return {
                            status: false,
                            message: 'Kesalahan!!, error to create new data.',
                            data: null
                        };
                    }
                }
            }

            return {
                status: true,
                message: 'Data berhasil ditambahkan.',
                data: {
                    date: createData.date,
                    time: createData.time
                }
            };
        } else {
            return {
                status: false,
                message: 'Token tidak valid',
                data: null,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: 'Kesalahan!!, error to create new data.',
            data: null
        };
    }
}

  
  
}
