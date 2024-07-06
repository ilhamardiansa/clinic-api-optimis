import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TermCategoryDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  name: string;
}
