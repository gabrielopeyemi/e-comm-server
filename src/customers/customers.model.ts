import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
});

export interface Customer extends mongoose.Document{
   id: string, 
   name: string,
   phone: string, 
   email:string
} 
