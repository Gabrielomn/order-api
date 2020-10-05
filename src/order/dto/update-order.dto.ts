// import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDTO } from './create-order.dto';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { OrderState, Item } from '../../database/models/order.schema'; 

export class UpdateOrderDTO {
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