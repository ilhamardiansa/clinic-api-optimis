import { IsString, IsDateString } from 'class-validator';

export class LastMedicalRecordDto {
  @IsDateString()
  consultation_date_time: Date;

  @IsString()
  doctor_name: string;

  @IsString()
  poly: string;

  @IsString()
  clinic_name: string;

  @IsString()
  condition: string;
}
