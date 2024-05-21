import { IsString, IsNumber } from 'class-validator';

export class RegionDto {
  @IsString()
  region_name: string;

  @IsNumber()
  country_id: number;
}
