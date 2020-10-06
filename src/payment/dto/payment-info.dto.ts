import { IsString, IsNotEmpty, IsOptional, IsArray, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { OrderState, Item } from '../../database/models/order.schema'; 
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
    public verificationDigits: Number;
}