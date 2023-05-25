import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { nguoi_dung } from '@prisma/client';
import { Response } from 'express';

@ApiTags('LOGIN')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  loginUser(@Body() body: nguoi_dung, @Res() res: Response) {
    return this.authService.loginUser(body, res)
  }

}
