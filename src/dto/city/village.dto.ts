import { IsString, IsNumber } from 'class-validator';

export class VillageDto {
  @IsString()
  village_name: string;

  @IsNumber()
  district_id: number;
}
