// import { FileHandle } from "./file-handler.model";

import { Product } from "./product.model";

export interface Order {

    _id?: string | null, 
    userId: string | null,
    client_name : string ,
    phone : string ,
    totalPrice : number ,
    address : string ,
    orderDate:Date,
    orderStatus:string,
    products: [{Product:any,quantity:number}],
    payment_method:string
}