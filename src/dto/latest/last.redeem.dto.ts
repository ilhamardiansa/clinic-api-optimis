import { IsString, IsDateString } from 'class-validator';

export class LastRedeemDto {
  @IsDateString()
  redemption_date_and_time: Date;

  @IsString()
  list_of_medications: string;

  @IsString()
  total_cost: string;

  @IsString()
  bank_transfer_name: string;
}
