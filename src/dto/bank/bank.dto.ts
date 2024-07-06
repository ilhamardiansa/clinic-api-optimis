import { IsString, MaxLength, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class BankDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty({ message: 'should not be empty' })
  bank_name: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  account_number: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  account_name: string;

  @IsInt()
  @IsOptional()
  service_charge?: number;

  @IsInt()
  @IsOptional()
  handling_fee?: number;
}
