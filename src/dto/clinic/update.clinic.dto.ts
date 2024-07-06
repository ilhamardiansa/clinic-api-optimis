import { IsString, IsNumber, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateClinicDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @MaxLength(64)
  clinic_name?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @MaxLength(64)
  address?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  @MaxLength(10)
  post_code?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  latitude?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  longitude?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsNumber()
  city_id?: number;
}
