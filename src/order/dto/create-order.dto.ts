import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { Item } from '../../database/models/order.schema'; 
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    value: number;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    items: Item[];
}