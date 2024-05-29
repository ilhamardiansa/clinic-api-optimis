import {  MaxLength } from 'class-validator';

export class VerifikasiDTO {
  @MaxLength(6)
  kode_otp: number;
}
