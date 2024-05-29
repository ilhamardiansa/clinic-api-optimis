import { IsString, IsNumber } from 'class-validator';

export class CityDto {
  @IsString()
  city_name: string;

  @IsNumber()
  region_id: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;
}
