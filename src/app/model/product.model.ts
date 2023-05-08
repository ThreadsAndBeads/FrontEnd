import { FileHandle } from "./file-handler.model";

export interface Product {
    user_id : string ; 
    name : string ,
    description : string ,
    price : number ,
    priceDiscount : number ,
    images: FileHandle[]

}