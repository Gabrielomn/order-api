import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { PaymentInfoDTO } from '../payment/dto/payment-info.dto';
import { OrderDocument } from 'src/database/models/order.schema';
import { ApiImplicitBody } from 'swagger-ui-express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Post()
  create(@Body() createOrderDto: CreateOrderDTO): Promise<OrderDocument> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDTO): Promise<UpdateOrderDTO> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Put('pay/:id')
  pay(@Param('id') id: string, @Body() paymentInfo: PaymentInfoDTO) {
    return this.orderService.pay(id, paymentInfo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
