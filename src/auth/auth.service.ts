import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { failCode, successCode } from 'src/untils/response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }
  private prisma = new PrismaClient()
  async loginUser(userLogin, res) {
    const user = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: userLogin.email
      }
    })
    if (user) {
      const checkPass = bcrypt.compareSync(userLogin.mat_khau, user.mat_khau)
      if (checkPass) {//kiểm tra mật khẩu
        const token = await this.jwtService.sign(user)
        console.log('token', token)
        return successCode(HttpStatus.ACCEPTED, token, 'Đăng nhập thành công')
      } else {
        throw new HttpException('Mật khẩu không đúng', HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new HttpException('Email không đúng', HttpStatus.BAD_REQUEST)
    }
  }
}
