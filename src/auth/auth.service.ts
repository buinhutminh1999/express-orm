import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { successCode } from 'src/untils/response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }
  private prisma = new PrismaClient()

  async loginUser(userLogin) {
    const user = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: userLogin.email
      }
    })
    if (user) {
      const checkPass = bcrypt.compareSync(userLogin.mat_khau, user.mat_khau)
      if (checkPass) {//kiểm tra mật khẩu
        const genToken = await this.jwtService.signAsync(user, { expiresIn: '1h', secret: process.env.SECRET_KEY}) //gen token with user
        return successCode(HttpStatus.ACCEPTED, genToken, 'Đăng nhập thành công')
      } else {
        throw new HttpException('Mật khẩu không đúng', HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new HttpException('Email không đúng', HttpStatus.BAD_REQUEST)
    }
  }
}
