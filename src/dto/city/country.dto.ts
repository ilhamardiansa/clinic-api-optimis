import { IsString } from 'class-validator';

export class CountryDto {
  @IsString()
  country_name: string;
}
