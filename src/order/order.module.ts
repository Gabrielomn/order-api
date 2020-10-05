import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from '../database/database.module';
import { Order, OrderSchema } from 'src/database/models/order.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
