import {CallHandler, ExecutionContext, NestInterceptor, UseInterceptors} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {plainToClass} from "class-transformer";
// import {userDto} from "../users/dtos/user.dto";
// this interface is created for type script and taking class as a dto arguments not other thing
interface ClassConstructor{
    new (...arg:any[]):{};
}
// for getting rid of long decorator and imoprt from controller
export function Serialize(dto:ClassConstructor){
   return UseInterceptors(new SerializeInterceptors(dto))
}
export class SerializeInterceptors implements NestInterceptor{
    constructor(private dto:any) {
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
       //Run something before a request is handled
        // by the request handler
        // console.log("Im running beforer the handler", context)

        return next.handle().pipe(
            map((data:any) =>{
                // return plainToClass(userDto,data,{   first it is using this but it was not accepting generic DTO (meansdiffrent dto's for diffrent response)
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues:true
                })
                // Run before the response is sent out
            // console.log('I am running beforre response is sent out', data)
        }),
        );
    }


}