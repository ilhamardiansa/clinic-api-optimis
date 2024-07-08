import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class LastMedicalRecordDto {
  @IsDateString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  consultation_date_time: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  doctor_name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  polyclinic: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  clinic_name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  conditions: string;
}
