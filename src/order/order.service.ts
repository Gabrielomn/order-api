import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { OrderDocument, OrderState } from '../database/models/order.schema'
import { InjectModel } from '@nestjs/mongoose';
import { PaymentService } from '../payment/payment.service';
import { PaymentInfoDTO } from 'src/payment/dto/payment-info.dto';
import { PaymentStatus } from 'src/payment/types/payment-status';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>, private paymentService: PaymentService){}

  create(createOrderDto: CreateOrderDTO) {
    const toCreate = {...createOrderDto, status: OrderState.PENDING}
    if(!toCreate.value || !toCreate.status || !toCreate.items){
      throw new BadRequestException('Something went wrong');
    }
    return this.orderModel.create(toCreate);
  }

  findAll() {
    return this.orderModel.find({});
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDTO) {
    const order = await this.orderModel.findById(id);

    if (!order) throw new NotFoundException('Order not found!');

    const update = Object.assign(order, updateOrderDto);
    return update.save();
  }

  async pay(id: string, paymentInfo: PaymentInfoDTO): Promise<PaymentStatus> {
    const order = await this.orderModel.findById(id);

    if (!order) throw new NotFoundException('Order not found!');
    if (order.status === OrderState.APPROVED) throw new BadRequestException('Order was already paid');

    const result = await this.paymentService.pay(paymentInfo, order.value);
    if (result.status) {
      order.status = OrderState.APPROVED;
      await order.save()
      return result;
    } else {
      throw new BadRequestException(result.message);
    }
  }

  remove(id: number){
    return this.orderModel.findById(id);
  }

}
