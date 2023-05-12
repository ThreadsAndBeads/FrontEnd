import { FileHandle } from "./file-handler.model";

export interface Product {

    _id?: string | null, 
    user_id: string | null,
    name : string ,
    description : string ,
    price : number ,
    priceDiscount : number ,
    images: FileHandle[]

}