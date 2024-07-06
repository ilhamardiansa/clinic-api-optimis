import { IsInt, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class approvaltokenDTO {
    
    @IsInt()
    doctor_id: number;

    @IsNotEmpty({ message: 'Tidak boleh kosong' })
    @IsBoolean()
    approval: boolean;
}
