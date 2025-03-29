import { PrismaService } from "@/db/prisma.service";
import { Injectable }    from "@nestjs/common";
import { Prisma, Users } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async saveUser(data: Prisma.UsersCreateInput): Promise<Users> {
    return await this.prisma.users.create({ data });
  }

  public async getUserById(id: string): Promise<Users> {
    return await this.prisma.users.findUnique({ where: { id } });
  }

  public async  getByEmail(email: string): Promise<Users> {
    return await this.prisma.users.findUnique({ where: { email } });
  }
}
