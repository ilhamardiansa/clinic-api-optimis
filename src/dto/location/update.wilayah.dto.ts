import { IsOptional, IsString, IsInt, Length, IsNotEmpty } from 'class-validator';

export class UpdateWilayahDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  id?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  provinsi?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  kabupaten?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  kecamatan?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @Length(1, 255)
  kelurahan?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  city_id?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  wilayah_id?: number;
}
