import { IsOptional, IsNumber, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateTermDto {
  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  term_category_id?: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  content?: string;
}
