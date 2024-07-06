import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateMedicalRecordDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @IsDate()
  consultation_date_time?: Date;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  polyclinic?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  clinic_name?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  doctor_name?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  way_to_come?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsDate()
  visiting_time?: Date;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  transportation?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  reference?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  person_responsible?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  traumatic?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  non_traumatic?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  conditions?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  complaint?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  history_of_illness?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  solution?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  clinic_id?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  user_id?: number;
}
