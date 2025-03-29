import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { JwtService }                                  from "@nestjs/jwt";

import { HashService }                                 from "./services/hash.services";
import { UserService }                                 from "./services/user.service";
import { UserSignIn, UserSignUp }                      from "./user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private readonly hashService: HashService, private readonly jwtService: JwtService) {}

  @Post("signup")
  public async signUp(@Body() userSignUp: UserSignUp): Promise<{accessToken: string}> {
    const userExists = await this.userService.getByEmail(userSignUp.email);
    if (userExists) {
      throw new BadRequestException("User already exists");
    }
    const passwordHash = await this.hashService.hashPassword(userSignUp.password, 10);
    const newUser = await this.userService.saveUser({ email: userSignUp.email, password: passwordHash });
    const token = await this.jwtService.sign({ email: newUser.email, id: newUser.id });
    if (newUser) {
      return { accessToken: token };
    }
    throw new BadRequestException("Can't save this user");
  }

  @Post("signin")
  public async signIN(@Body() userSignIn: UserSignIn): Promise<{accessToken: string}> {
    const user = await this.userService.getByEmail(userSignIn.email);
    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }
    const passwordMatch = await this.hashService.comparePassword(userSignIn.password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException("Incorrect password");
    }
    const token = await this.jwtService.sign({ email: user.email, id: user.id });

    return { accessToken: token };
  }
}
