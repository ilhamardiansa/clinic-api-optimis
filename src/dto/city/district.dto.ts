import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class DistrictDto {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  district_name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  city_id: number;
}
