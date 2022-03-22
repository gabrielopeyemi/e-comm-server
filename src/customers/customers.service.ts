import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose"
import { Customer } from "./customers.model";

@Injectable()
export class CustomersService {
customers: Customer[] = [];

constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>) 
    {}

async createCustomer(name: string, phone: string, email: string) { 
    const newCustomer = new this.customerModel({
        name,
        phone, 
        email
    })
    const customers = await newCustomer.save();
    return customers.id;
}

async getCustomers() {
    const customers = await this.customerModel.find();
     return customers.map(customer =>({
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email
    }));;
   }

async getSingleCustomer(customerId: string) {
       const customers = await this.findCustomer(customerId);
       return {
           id: customers.id,
           name: customers.name,
           phone: customers.phone,
           email: customers.email
       };
   }


async updateCustomer(customerId: string, name: string, phone: string, email: string) {
    const updatedCustomer = await this.findCustomer(customerId);
   
    if (name) {
         updatedCustomer.name =name;
    }if (phone) {
     updatedCustomer.phone = phone;
    }if (email) {
     updatedCustomer.email = email;
    }
     updatedCustomer.save();
  }

async deleteCustomer(customerId: string) {
    const result = await this.customerModel.deleteOne({_id: customerId}).exec();
    // console.log(result);
    if (result.deletedCount === 0) {
      throw new NotFoundException('customer not found!');
    }
}

private async findCustomer(id: string): Promise<Customer>{
    let customers;
    try {
     customers = await this.customerModel.findById(id);
    } catch (error) {
         throw new NotFoundException('customers not found!')
    }
   if (!customers) {
        throw new NotFoundException('customers not found!')
    }
    return customers;
}

 } 