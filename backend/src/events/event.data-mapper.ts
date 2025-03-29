import { Injectable }   from "@nestjs/common";
import { Event }        from "@prisma/client";

import { EventRequest } from "./event.types";

@Injectable()
export class EventDataMapper {
  toRequestData(event: Event): EventRequest {
    return {
      id         : event.id,
      name       : event.name,
      description: event.description,
      importance : event.importance,
      createdAt  : event.createdAt,
      eventDate  : event.eventDate,
    };
  }
}
