import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateFeeDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  clinic_id?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  activities?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  @Min(0)
  cost?: number;
}
