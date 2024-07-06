import { IsInt, IsDate, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SchedulesDTO {
  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  doctor_id: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  clinic_name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  poly_name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  approval: boolean;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'should not be empty' })
  date: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  time: string;
}
