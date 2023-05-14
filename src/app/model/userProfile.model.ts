import { FileHandle } from "./file-handler.model";

export interface User {
  _id: string;
    name : string ,
    email : string ,
    type : string ,
  image: FileHandle[],
  phone: Number,
    address: {
    appartmentNo: number;
      city: string;
      country: string;
    };
    socialMediaLinks: {
     name: string;
     link: string;
    }[];

}