import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { customersModule } from './customers/customers.module';

@Module({
  imports: [customersModule, MongooseModule.forRoot(
    'mongodb+srv://oluwagbenga:REY$VE*m8*biKM2@sandbox.rclek.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
