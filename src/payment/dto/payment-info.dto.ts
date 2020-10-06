import { IsString, IsNotEmpty, IsOptional, IsArray, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { OrderState, Item } from '../../database/models/order.schema'; 

export class PaymentInfoDTO {
    @IsString()
    @IsNotEmpty()
    public creditCard: string;

    @IsString()
    @IsNotEmpty()
    public expirationDate: string;

    @IsNumber()
    @IsNotEmpty()
    public verificationDigits: Number;
}