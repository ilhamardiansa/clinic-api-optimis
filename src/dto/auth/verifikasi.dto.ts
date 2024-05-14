import { IsEmail, IsNumber, MaxLength } from 'class-validator';

export class VerifikasiDTO {
  @IsNumber()
  @MaxLength(6)
  kode_otp: number;
}
