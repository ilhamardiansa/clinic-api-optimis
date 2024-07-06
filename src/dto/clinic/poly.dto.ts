import { IsString, IsNumber, MaxLength, IsNotEmpty } from 'class-validator';

export class PolyDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty({ message: 'should not be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  clinic_id: number;
}
