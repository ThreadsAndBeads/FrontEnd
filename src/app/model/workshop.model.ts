import { FileHandle } from "./file-handler.model";

export interface Workshop {

    _id?: string | null, 
    seller_id: string | null,
    seller_name:string,
    title : string ,
    description : string ,
    category : string,
    price : number ,
    startDate : Date ,
    endDate :Date 
    image: FileHandle[]

}