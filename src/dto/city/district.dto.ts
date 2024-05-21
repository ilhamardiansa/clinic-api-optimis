import { IsString, IsNumber } from 'class-validator';

export class DistrictDto {
  @IsString()
  district_name: string;

  @IsNumber()
  city_id: number;
}
