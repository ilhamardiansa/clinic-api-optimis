import {
  IsString,
  IsInt,
  IsOptional,
  IsLatitude,
  IsLongitude,
  MaxLength,
} from 'class-validator';

export class DoctorDto {
  @IsString()
  @MaxLength(64)
  doctor_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @MaxLength(64)
  address: string;

  @IsInt()
  city_id: number;

  @IsString()
  @MaxLength(10)
  post_code: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsString()
  @MaxLength(32)
  title: string;

  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  education: string;

  @IsInt()
  poly_id: number;
}
