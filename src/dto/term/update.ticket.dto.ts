import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateTicketDto {
  @IsNotEmpty({ message: 'should not be empty' })
  @MaxLength(255)
  title: string;

  @IsNotEmpty({ message: 'should not be empty' })
  content: string;
}
