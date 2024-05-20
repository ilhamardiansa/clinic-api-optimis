import { IsOptional, IsString, MaxLength, IsPhoneNumber } from 'class-validator';

export class ProfileDto {
    @IsOptional()
    @IsString()
    @MaxLength(64)
    fullname: string;

    @IsPhoneNumber('ID')
    phone_number: string;

    @IsOptional()
    profil_image: string;

    no_identity: number;

    birth_date: Date;

    @IsString()
    birth_place: number;

    @IsString()
    address: string;

    @IsString()
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
  