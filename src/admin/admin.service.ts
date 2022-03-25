import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose"
import { Admin} from "./admin.model";

@Injectable()
export class AdminService {
Admins: Admin[] = [];

constructor(
    @InjectModel('Admin') private readonly AdminModel: Model<Admin>) 
    {}

async createAdmin(name: string, phone: string, email: string) { 
    const newAdmin= new this.AdminModel({
        name,
        phone, 
        email
    })
    const Admins = await newAdmin.save();
    return Admins.id;
}

async getAdmins() {
    const Admins = await this.AdminModel.find();
     return Admins.map(Admin=>({
        id: Admin.id,
        name: Admin.name,
        phone: Admin.phone,
        email: Admin.email
    }));;
   }

async getSingleAdmin(AdminId: string) {
       const Admins = await this.findAdmin(AdminId);
       return {
           id: Admins.id,
           name: Admins.name,
           phone: Admins.phone,
           email: Admins.email
       };
   }


async updateAdmin(AdminId: string, name: string, phone: string, email: string) {
    const updatedAdmin= await this.findAdmin(AdminId);
   
    if (name) {
         updatedAdmin.name =name;
    }if (phone) {
     updatedAdmin.phone = phone;
    }if (email) {
     updatedAdmin.email = email;
    }
     updatedAdmin.save();
  }

async deleteAdmin(AdminId: string) {
    const result = await this.AdminModel.deleteOne({_id: AdminId}).exec();
    // console.log(result);
    if (result.deletedCount === 0) {
      throw new NotFoundException('Adminnot found!');
    }
}

private async findAdmin(id: string): Promise<Admin>{
    let Admins;
    try {
     Admins = await this.AdminModel.findById(id);
    } catch (error) {
         throw new NotFoundException('Admins not found!')
    }
   if (!Admins) {
        throw new NotFoundException('Admins not found!')
    }
    return Admins;
}

 } 