import { IsOptional, IsString, MaxLength, IsPhoneNumber,IsMimeType } from 'class-validator';

export class ProfileDto {
  @IsOptional()
  @MaxLength(64)
  fullname: string;

  @IsOptional()
  @IsPhoneNumber('ID')
  phone_number: string;

  @IsMimeType()
  profil_image: any;
  
  no_identity: number;

  birth_date: Date;

  birth_place: number;

  address: string;

  gender: string;

  @IsOptional()
  work_in: string;

  @IsOptional()
  blood_type: string;

  @IsOptional()
  marital_status: string;

  @IsOptional()
  nationality: string;

  @IsOptional()
  religion: string;

  @IsOptional()
  country_id: number;

  @IsOptional()
  region_id: number;

  @IsOptional()
  city_id: number;

  @IsOptional()
  district_id: number;

  @IsOptional()
  village_id: number;

  @IsOptional()
  neighborhood_no: number;

  @IsOptional()
  citizen_no: number;

  @IsOptional()
  area_code: number;
}