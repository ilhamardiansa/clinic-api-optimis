import { IsString, MaxLength, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateSummaryDto {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  poly_id: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  doctor_id: number;

  @IsNotEmpty({ message: 'should not be empty' })
  scheduled_date_time: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  qr_code: string;

  @IsBoolean()
  @IsOptional()
  image_captured_checked?: boolean;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty({ message: 'should not be empty' })
  symptoms: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  symptoms_description: string;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  ai_status?: boolean;

  @IsOptional()
  ai_response?: string;

  @IsOptional()
  image_url: string;

  @IsOptional()
  ai_token: string;

  drug: { drug_id: number; qty: number }[];
}
