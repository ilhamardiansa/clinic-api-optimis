import { IsInt, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class approvaltokenDTO {
    
    @IsInt()
    @IsNotEmpty({ message: 'should not be empty' })
    @ApiProperty()
    doctor_id: number;

    @IsNotEmpty({ message: 'Tidak boleh kosong' })
    @ApiProperty()
    @IsBoolean()
    approval: boolean;
}
