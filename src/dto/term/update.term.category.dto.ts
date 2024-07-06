import { IsString, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTermCategoryDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  name?: string;
}
