import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class LastRedeemDto {
  @IsDateString()
  @IsNotEmpty({ message: 'should not be empty' })
  redemption_date_and_time: Date;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  list_of_medications: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  total_cost: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  bank_transfer_name: string;
}
