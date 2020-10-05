import { IsString, IsNotEmpty, IsOptional, IsArray, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { OrderState, Item } from '../../database/models/order.schema'; 

export class CreateOrderDTO {

    @IsNumber()
    @IsNotEmpty()
    value: number;

    // @IsEnum(OrderState)
    // @IsNotEmpty()
    // status: OrderState;

    @IsArray()
    @IsNotEmpty()
    items: Item[];
}