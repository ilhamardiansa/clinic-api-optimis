import { IsString, MaxLength, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class DiagnosisDTO {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  deaseas_name: string;
}
