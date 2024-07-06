import { IsNotEmpty, IsString } from 'class-validator';

export class CountryDto {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  country_name: string;
}
