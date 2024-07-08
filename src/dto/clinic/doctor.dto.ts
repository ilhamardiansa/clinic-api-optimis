import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDate, IsOptional, IsNotEmpty } from 'class-validator';

export class DoctorDto {

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  doctor_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  post_code: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  latitude: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  longitude: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  experience: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  education: string;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  poly_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  @ApiProperty()
  wilayah_id: number;

  poly: {
    id: number;
    name: string;
    description: string;
    clinic_id: number;
  };

  wilayah: {
    id: number;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
  };
}
