import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserContrller } from "./user.controller";
import { Favorito } from "src/favorito/favorito.entity";



@Module({
    imports: [TypeOrmModule.forFeature([User, Favorito])],
    providers: [UserService],
    controllers: [UserContrller],
    exports: [UserService], 
})
export class UserModule {}