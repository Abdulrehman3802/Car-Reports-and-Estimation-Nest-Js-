import {AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Exclude} from "class-transformer";
import {Report} from "../../reports/reprts.entity";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    // @Exclude()  // for excluding it from json response (this is nest recommended)
    password:string;
    @Column({default:true})
    admin:boolean
    @OneToMany(()=>Report,(reports)=>reports.user)
    reports:Report[]
@AfterInsert()
    CreateLog(){
    console.log("User created with ID",this.id);
}
}