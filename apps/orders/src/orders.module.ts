import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import * as joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { OrdersRepository } from './orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: joi.object({
      MONGODB_URI: joi.string().required(),
      PORT: joi.number().required()
    }),
    envFilePath: './apps/orders/.env'
  }),
  DatabaseModule,
  MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  RmqModule.register({
    name: 'BILLING'
  })
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule { }
