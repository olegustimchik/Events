import { PrismaService }   from "@/db/prisma.service";
import { JwtAuthModule }   from "@/jwt/jwt.module";
import { UsersModule }     from "@/users/users.module";
import { Module }          from "@nestjs/common";

import { EventController } from "./event.controller";
import { EventDataMapper } from "./event.data-mapper";
import { EventService }    from "./events.service";

@Module({
  imports    : [JwtAuthModule, UsersModule],
  controllers: [EventController],
  providers  : [EventService, EventDataMapper, PrismaService],
})
export class EventsModule {}
