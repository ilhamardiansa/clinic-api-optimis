import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class TicketDto {
  @IsEmail()
  @IsNotEmpty({ message: 'should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'should not be empty' })
  @MaxLength(255)
  title: string;

  @IsNotEmpty({ message: 'should not be empty' })
  content: string;
}
