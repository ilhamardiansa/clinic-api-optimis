import { IsInt, IsString, IsDate, IsOptional, IsNotEmpty } from 'class-validator';

export class DoctorDto {

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  doctor_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  post_code: string;

  @IsNotEmpty({ message: 'should not be empty' })
  latitude: number;

  @IsNotEmpty({ message: 'should not be empty' })
  longitude: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  experience: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  education: string;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  poly_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
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
