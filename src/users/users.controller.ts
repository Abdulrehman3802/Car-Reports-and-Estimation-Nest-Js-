import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    NotFoundException,
    Session, UseGuards
} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import{updateUserDTO} from "./dtos/update-user.dto";
import {UsersService} from "./users.service";
import {AuthService} from "./auth.service";
import {Serialize} from "../interceptors/serialize.interceptors";
import {userDto} from "./dtos/user.dto";
import {CurrentUser} from "./decorators/create-user.decorator";
import {User} from "./entities/user.entity";
import {AuthGuard} from "../guard/auth.guard";
// import {CurrentUserInterceptors} from "./interceptors/current-user.interceptors";

@Controller('auth')
@Serialize(userDto)// for applying it to whole controller
// @UseInterceptors(CurrentUserInterceptors) we use it globally in user module

export class UsersController {
    constructor(
        private userService:UsersService,
        private authService:AuthService

    ) {
    }
    // we are writing the alternative of this in which we use custom decorator
    // @Get('/whoami')
    // async whoami(@Session() session:any){
    //     return  await this.userService.findOne(session.userId)
    // }
    @UseGuards(AuthGuard)
    @Get('/whoami')
    async whoami(@CurrentUser() user:User){
        return  user
    }
    @Post('/signup')
    async createUser(@Body() body:CreateUserDto, @Session() session:any){
       const user = await this.authService.signup(body.email,body.password)
        session.userId = user.id
        return user

    }
    @Post('/signout')
    async signOut(@Session() session:any){
        session.userId = null
    }
    @Post('/signin')
    async login(@Body() body:CreateUserDto,@Session() session:any){
        const user = await this.authService.signin(body.email,body.password)
        session.userId = user.id
        return user
    }

// @UseInterceptors(ClassSerializerInterceptor)  first using recommended nest js
// @UseInterceptors(SerializeInterceptors)   second it is using this but it was not accepting generic DTO (meansdiffrent dto's for diffrent response)
// @UseInterceptors(new SerializeInterceptors(userDto))     getting rid from this because of cutom decorator
//     @Serialize(userDto)
    @Get('/:id')
    async findUser(@Param('id') id:number){
    // console.log("handler")
        const user = await this.userService.findOne(id);
        if(!user)
        {
            throw new NotFoundException("user not found")
        }
        return user
    }

    @Get()
    find(@Query('email') email:string){
        return this.userService.find(email);
    }
    @Delete('/:id')
    removeUser(@Param('id') id:number){
        return this.userService.remove(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id:number, @Body() body:updateUserDTO){
        return this.userService.Update(id,body);
    }

}
