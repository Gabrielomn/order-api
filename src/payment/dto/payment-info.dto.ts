import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentInfoDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public creditCard: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public expirationDate: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    public verificationDigits: number;
}