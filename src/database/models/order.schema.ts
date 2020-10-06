import { Document, Schema } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderState{
    APPROVED = "APPROVED",
    PENDING = "PENDING",
}

export class Item{
    name: string;
    amount: number;
    value: number;
}

export class Order {
  constructor(public value: number, public status: OrderState, public items: Item[]) {}
}

export const OrderSchema = new Schema({
  status: {type: String, required: true},
  items: {type: Array, required: true},
  value: {type: Number, required: true}
});