import {
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class MedicalRecordDto {
  @IsDate()
  @IsNotEmpty({ message: 'should not be empty' })
  consultation_date_time: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  way_to_come: string;

  @IsDate()
  @IsNotEmpty({ message: 'should not be empty' })
  visiting_time: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  transportation: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  reference: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  person_responsible: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  traumatic: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  non_traumatic: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  conditions: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  complaint: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  history_of_illness: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  solution: string;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  user_id: number;
}
