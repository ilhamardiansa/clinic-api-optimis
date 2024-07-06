import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class FeeDto {
  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  clinic_id: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  activities: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty({ message: 'should not be empty' })
  cost: number;
}
