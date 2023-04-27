import {MiddlewareConsumer, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
// import {APP_INTERCEPTOR} from "@nestjs/core";
import {User} from "./entities/user.entity";
import {AuthService} from "./auth.service";
// import {CurrentUserInterceptors} from "./interceptors/current-user.interceptors";
import {CurrentUserMiddleware} from "./middleware/current-user.middleware";
@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,AuthService,
    // { provide:APP_INTERCEPTOR,// for globally taking signed in user's id
    //   useClass:CurrentUserInterceptors}
    ]
})
export class UsersModule {
  configure(consumer:MiddlewareConsumer){
      consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
