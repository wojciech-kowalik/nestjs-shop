import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserObject } from '../decorators/user-object.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async phoneRegister(
    @Body() req: AuthLoginDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObject() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }
}
