import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  fullname: string;

  @IsNotEmpty({ message: 'phone number should not be empty' })
  @IsPhoneNumber('ID')
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty({ message: 'no identity should not be empty' })
  @ApiProperty()
  noIdentity: string;

  @IsOptional()
  @ApiProperty()
  birthDate: Date;

  @IsOptional()
  @ApiProperty()
  birthPlace: string;

  @IsNotEmpty({ message: 'address should not be empty' })
  @ApiProperty()
  address: string;

  @IsNotEmpty({ message: 'gender should not be empty' })
  @ApiProperty()
  gender: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  workIn: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  bloodType: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  maritalStatus: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  nationality: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  religion: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  cityId: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  neighborhoodNo: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  citizenNo: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  areaCode: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  responsible_for_costs: string;
}
