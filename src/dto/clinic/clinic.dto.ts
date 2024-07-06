import { IsString, IsNumber, MaxLength, IsNotEmpty } from 'class-validator';

export class ClinicDto {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  clinic_name: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  description: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  address: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty({ message: 'should not be empty' })
  post_code: string;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  latitude: number;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  longitude: number;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  city_id: number;
}
