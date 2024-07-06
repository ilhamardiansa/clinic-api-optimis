import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class LastMedicalRecordDto {
  @IsDateString()
  @IsNotEmpty({ message: 'should not be empty' })
  consultation_date_time: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  doctor_name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  polyclinic: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  clinic_name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  conditions: string;
}
