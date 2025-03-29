import { PrismaService }               from "@/db/prisma.service";
import { UserService }                 from "@/users/services/user.service";
import { Module }                      from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService }       from "@nestjs/jwt";

import { AuthGuard }                   from "./auth.guard";

@Module({
  imports: [
    JwtModule.registerAsync({
      global    : true,
      imports   : [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret     : config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: config.get<string>("JWT_EXPIRES_IN") || "1h" },
      }),
      inject: [ConfigService],
    }),
  ],
  exports  : [JwtModule, AuthGuard],
  providers: [AuthGuard, UserService, PrismaService],
})
export class JwtAuthModule {}
