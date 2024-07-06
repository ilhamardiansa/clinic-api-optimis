import { IsInt, IsDate, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class setTimeDTO {
    
    @IsInt()
    @IsNotEmpty({ message: 'should not be empty' })
    doctor_id: number;

    @IsInt()
    @IsNotEmpty({ message: 'should not be empty' })
    poly_id: number;

    @IsInt()
    @IsNotEmpty({ message: 'should not be empty' })
    clinic_id: number;

    @IsDate()
    @IsNotEmpty({ message: 'should not be empty' })
    date: Date;

    @IsArray()
    @IsNotEmpty({ message: 'should not be empty' })
    time: string;
}
