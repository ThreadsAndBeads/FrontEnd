import { FileHandle } from "./file-handler.model";

export interface User {
  _id: string;
    name : string ,
    email : string ,
    type : string ,
  image: string,
  phone: Number | null,
    address: {
    appartmentNo: number | null;
      city: string;
      country: string;
    };
    socialMediaLinks: {
     name: string;
     link: string;
    }[];

}