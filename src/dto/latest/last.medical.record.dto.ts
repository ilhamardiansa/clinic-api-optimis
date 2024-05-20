import { IsString, IsDateString } from 'class-validator';

export class LastMedicalRecordDto {
  @IsDateString()
  consultation_date_time: Date;

  @IsString()
  doctor_name: string;

  @IsString()
  polyclinic: string;

  @IsString()
  clinic_name: string;

  @IsString()
  condition: string;
}
