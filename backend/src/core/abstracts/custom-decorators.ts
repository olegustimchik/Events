import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserData = createParamDecorator((data: unknown, ctx: ExecutionContext): { id: string, email: string} => {
  const request = ctx.switchToHttp().getRequest();

  return request.user; // Extracts the data added by the guard
});
