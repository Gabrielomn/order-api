import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderSchema, OrderState } from '../database/models/order.schema'
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>){}

  create(createOrderDto: CreateOrderDTO) {
    const toCreate = {...createOrderDto, status: OrderState.PENDING}

    return this.orderModel.create(toCreate);
  }

  findAll() {
    return this.orderModel.find({});
  }

  findOne(id: number) {
    return this.orderModel.findById(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDTO) {
    const order = await this.orderModel.findById(id);

    if (!order) throw new NotFoundException('Order not found!');

    const update = Object.assign(order, updateOrderDto);
    return update.save();
  }

  remove(id: number){
    return this.orderModel.findById(id);
  }

}
