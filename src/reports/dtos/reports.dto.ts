import {Expose, Transform} from "class-transformer";

export class ReportsDto{
    @Expose()
    id:number
    @Expose()
    price:number
    @Expose()
    approved:boolean
    @Expose()
    mileage:number
    @Expose()
    year:number
    @Expose()
    lng:number
    @Expose()
    lat:number
    @Expose()
    make:string
    @Expose()
    model:string
    @Transform(({obj})=> obj.user.id)
    @Expose()
    userId:number
}