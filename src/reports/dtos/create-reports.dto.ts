import {IsLatitude, IsLatLong, IsLongitude, IsNumber, IsString, Max, Min} from "class-validator";

export class CreateReportsDto{
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price:number
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage:number;
    @IsLongitude()
    lng:number
    @IsLatitude()
    lat:number
    @IsString()
    make:string
    @IsString()
    model:string
    @IsNumber()
    @Min(1930)
    @Max(2024)
    year:number
}