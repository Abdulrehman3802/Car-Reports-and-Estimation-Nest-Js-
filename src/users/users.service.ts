import {Injectable,NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>) {}
    Create(email:string ,password:string){
        const user = this.repo.create({email,password})
        return this.repo.save(user);
    }
    findOne(id:number){
        if(!id)
        {
            console.log("here in findOne")
            return null
        }

        return this.repo.findOne({ where: { id } });
    }
    find(email:string){
        return this.repo.find({ where: { email }})
    }
    async Update(id : number , attr:Partial<User>){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException("User not found")
        }
        Object.assign(user,attr);
        return this.repo.save(user);
}
    async remove(id:number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException("User not found")
        }
        return this.repo.remove(user)
    }
}
