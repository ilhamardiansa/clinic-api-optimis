import { IsInt, IsDate, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SchedulesUpdateDTO {

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'should not be empty' })
  date: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  time: string;
}
