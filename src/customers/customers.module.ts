import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './customers.controller';
import { CustomerSchema } from './customers.model';
import { CustomersService } from './customers.service';

@Module ({
   imports: [MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])],
   controllers: [CustomersController], 
   providers: [CustomersService],
})
export class customersModule {}