import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './models/order.schema';

@Module({
  imports: [
            MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])
          ],
  controllers: [],
  providers: [],
  exports:[
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])
  ]
})
export class DatabaseModule {}