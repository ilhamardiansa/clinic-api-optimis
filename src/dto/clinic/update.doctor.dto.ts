import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateDoctorDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  doctor_name?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  address?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  post_code?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  latitude?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsInt()
  longitude?: number;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  experience?: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @IsString()
  education?: string;
}
