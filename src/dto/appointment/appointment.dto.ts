import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDTO {
    @IsString()
    @IsNotEmpty({ message: 'should not be empty' })
    code: string
}
