import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { nguoi_dung } from '@prisma/client';
import { Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  // private jwt: JwtService

  @Post('/login')
  loginUser(@Body() body: nguoi_dung) {
    return this.authService.loginUser(body)
  }

}
