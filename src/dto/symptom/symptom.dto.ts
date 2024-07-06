import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SymptomDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty({ message: 'should not be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  description: string;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  poly_id: number;
}
