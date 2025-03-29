import { Module }        from "@nestjs/common";
import { ConfigModule }  from "@nestjs/config";

import { EventsModule }  from "./events/event.module";
import { JwtAuthModule } from "./jwt/jwt.module";
import { UsersModule }   from "./users/users.module";

@Module({
  imports    : [ConfigModule.forRoot({ isGlobal: true }), UsersModule, JwtAuthModule, EventsModule],
  controllers: [],
  providers  : [],
})
export class AppModule {}
