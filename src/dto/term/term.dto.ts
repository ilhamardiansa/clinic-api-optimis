import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class TermDto {
  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  term_category_id: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @IsEmail()
  email: string;
}
