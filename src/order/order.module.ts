import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from '../database/database.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports:[
    DatabaseModule,
    PaymentModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
