import { IsString, IsInt, Length, IsNotEmpty } from 'class-validator';

export class CreateWilayahDto {
  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  id: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  provinsi: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  kabupaten: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  kecamatan: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty({ message: 'should not be empty' })
  kelurahan: string;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  city_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  wilayah_id: number;
}
