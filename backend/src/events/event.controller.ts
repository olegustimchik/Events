import { UserData }                                                                               from "@/core/abstracts/custom-decorators";
import { EventService }                                                                           from "@/events/events.service";
import { AuthGuard }                                                                              from "@/jwt/auth.guard";
import { BadRequestException, Body, Controller, Post, UseGuards, Param, Delete, Put, Get, Query } from "@nestjs/common";

import { EventDataMapper }                                                                        from "./event.data-mapper";
import { CreateEvent, DeleteEvent, GetEvent, GetEvents, UpdateEvent }                             from "./event.dto";
import { EventRequest }                                                                           from "./event.types";

@Controller("event")
@UseGuards(AuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService, private readonly eventDataMapper: EventDataMapper) {}

  @Post("/")
  public async createEvent(@Body() body: CreateEvent, @UserData() userData: any): Promise<EventRequest> {
    const event = await this.eventService.createEvent({ ...body, user: { connect: { id: userData.id } } });
    if (!event) {
      throw new BadRequestException("Can't create event");
    }

    return this.eventDataMapper.toRequestData(event);
  }

  @Delete("/:id")
  public async deleteEvent(@Param() param: DeleteEvent, @UserData() userData: any): Promise<EventRequest> {
    const event = await this.eventService.deleteEvent(param.id);
    if (!event) {
      throw new BadRequestException("You can't delete this event");
    }

    return this.eventDataMapper.toRequestData(event);
  }

  @Put("/:id")
  public async updateEvent(@Body() body: UpdateEvent, @Param() param: GetEvent, userData: any): Promise<EventRequest> {
    const event = await this.eventService.updateEvent({ ...body }, { id: param.id });
    if (!event) {
      throw new BadRequestException("You can't update this event");
    }

    return this.eventDataMapper.toRequestData(event);
  }

  @Get("/list")
  public async getEvents(@Query() query: GetEvents, @UserData() userData: any): Promise<{data: Array<EventRequest>, total: number}> {
    const events = await this.eventService.getEvents({ userId: userData.id }, +query.take, +query.skip);
    const total = await this.eventService.getCount({ userId: userData.id });
    const mapped = events.map(item => this.eventDataMapper.toRequestData(item));

    return { data: mapped, total };
  }

  @Get("/:id")
  public async getEvent(@Param() param: GetEvent, @UserData() userData: any): Promise<EventRequest> {
    const event = await this.eventService.getEvent({ id: param.id, userId: userData.id });
    if (!event) {
      throw new BadRequestException("Can't get event");
    }

    return this.eventDataMapper.toRequestData(event);
  }
}

