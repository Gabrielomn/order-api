import { Item } from "src/database/models/order.schema";

export class Order {
    public id?: string;
    public value: number;
    public status: string;
    public items: Item[];
}