import {
  IsOptional,
  IsString,
  MaxLength,
  IsPhoneNumber,
  IsNotEmpty,
  IsDate,
  IsInt,
  isString,
} from 'class-validator';

export class ProfileDto {
  @MaxLength(64)
  @IsNotEmpty({ message: 'full name should not be empty' })
  fullname: string;

  @IsNotEmpty({ message: 'phone number should not be empty' })
  @IsPhoneNumber('ID')
  phoneNumber: string;

  @IsNotEmpty({ message: 'no identity should not be empty' })
  noIdentity: string;

  @IsOptional()
  birthDate: Date;

  @IsOptional()
  birthPlace: string;

  @IsNotEmpty({ message: 'address should not be empty' })
  address: string;

  @IsNotEmpty({ message: 'gender should not be empty' })
  gender: string;

  @IsOptional()
  @IsString()
  workIn: string;

  @IsOptional()
  @IsString()
  bloodType: string;

  @IsOptional()
  @IsString()
  maritalStatus: string;

  @IsOptional()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsString()
  religion: string;

  @IsOptional()
  @IsInt()
  cityId: number;

  @IsOptional()
  @IsInt()
  neighborhoodNo: number;

  @IsOptional()
  @IsInt()
  citizenNo: number;

  @IsOptional()
  @IsInt()
  areaCode: number;

  @IsOptional()
  @IsString()
  responsible_for_costs: string;
}
