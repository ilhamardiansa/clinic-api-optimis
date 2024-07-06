import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePaymentDetailsDto {
  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  payment_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  drug_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  quantity: number;

  @IsInt()
  @IsNotEmpty({ message: 'should not be empty' })
  fee_id: number;
}
