import { PrismaService }  from "@/db/prisma.service";
import { JwtAuthModule }  from "@/jwt/jwt.module";
import { UserController } from "@/users/user.controller";
import { Module }         from "@nestjs/common";

import { HashService }    from "./services/hash.services";
import { UserService }    from "./services/user.service";

@Module({
  imports    : [JwtAuthModule],
  controllers: [UserController],
  providers  : [PrismaService, UserService, HashService],
  exports    : [UsersModule, UserService],

})
export class UsersModule {}
