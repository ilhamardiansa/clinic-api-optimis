import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDrugDto {
  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  drug_name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  stock: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  drug_summary: string;

  @IsNotEmpty({ message: 'should not be empty' })
  buy_price: number;

  @IsNotEmpty({ message: 'should not be empty' })
  sell_price: number;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  image_url: string;

  @IsString()
  @IsNotEmpty({ message: 'should not be empty' })
  company_name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'should not be empty' })
  category_id: number;
}
