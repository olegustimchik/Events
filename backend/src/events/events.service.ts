import { PrismaService } from "@/db/prisma.service";
import { Injectable }    from "@nestjs/common";
import { Event, Prisma } from "@prisma/client";

@Injectable()

export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createEvent(data: Prisma.EventCreateInput): Promise<Event> {
    return await this.prismaService.event.create({ data });
  }

  public async getEvent(data: Prisma.EventWhereInput): Promise<Event> {
    return await this.prismaService.event.findFirst({ where: data });
  }

  public async getEvents(data: Prisma.EventWhereInput, take: number, skip: number): Promise<Array<Event>> {
    return await this.prismaService.event.findMany({
      where: data, take, skip,
    });
  }

  public async getCount(data: Prisma.EventWhereInput): Promise<number> {
    return await this.prismaService.event.count({ where: data });
  }

  public async deleteEvent(id: string) : Promise<Event> {
    return await this.prismaService.event.delete({ where: { id } });
  }

  public async updateEvent(data: Prisma.EventUpdateInput, where: Prisma.EventWhereUniqueInput): Promise<Event> {
    return await this.prismaService.event.update({ data, where });
  }
}
