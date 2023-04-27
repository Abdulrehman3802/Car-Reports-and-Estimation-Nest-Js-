import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {UsersService} from "./users.service";
import {randomBytes,scrypt as _scrypt} from "crypto"
import {promisify} from 'util'
const scrypt = promisify(_scrypt)
@Injectable()
export class AuthService{
constructor(private userService: UsersService) {}

   async  signup(email:string ,password:string){
        // if email exist
        const user = await this.userService.find(email);
        if(user.length){
            throw new BadRequestException("Email already exist");
        }
        //salt
       const salt = randomBytes(8).toString('hex')
       // hash
       const hash = (await scrypt(password,salt,32)) as Buffer;
        // concatenating to store password
        const result = salt +'.'+hash.toString('hex')

       const User = await this.userService.Create(email,result)

       return User
    }
    async signin(email:string, password:string){
        const [user] = await this.userService.find(email)
        if(!user){
            throw new NotFoundException("user not found")
        }
        const [salt, storeHash] = user.password.split('.')
        const hash = (await scrypt(password,salt,32)) as Buffer;
        if(storeHash !== hash.toString('hex')){
            throw new BadRequestException("Wrong password")
        }
        return user;
    }
}