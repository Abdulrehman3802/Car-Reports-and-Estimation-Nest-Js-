import {Expose} from "class-transformer";
// This proper way to hide any property of db from response
export class userDto{
    @Expose()
    id:number;
    @Expose()
    email:string;
}