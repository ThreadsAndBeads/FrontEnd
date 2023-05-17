import { FileHandle } from "./file-handler.model";

export interface Workshop {

    _id?: string | null, 
    seller_id: string | null,
    seller_name:string,
    title : string ,
    description : string ,
    price : number ,
    startDate : Date |null,
    endDate :Date | null,
    image: FileHandle | null

}