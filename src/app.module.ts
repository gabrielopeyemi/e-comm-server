import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { customersModule } from './customers/customers.module';
import { adminModule } from './admin/admin.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: `env/.env.dev` });

@Module({
  imports: [adminModule,customersModule, MongooseModule.forRoot( process.env.MONGO_URL  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
