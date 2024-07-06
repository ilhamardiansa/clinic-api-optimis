import { IsString, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty({ message: 'should not be empty' })
  category_name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
