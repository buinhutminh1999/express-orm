import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { failCode, successCode } from './untils/response';
@Injectable()
export class AppService {
  private prisma = new PrismaClient()
  async sigupUser(nguoi_dung) {
    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: nguoi_dung.email
      }

    })
    if (checkUser) {
      throw new HttpException('Email đã được đăng ký', HttpStatus.BAD_REQUEST)
    }
    const mat_khau = bcrypt.hashSync(nguoi_dung.mat_khau, 1)
    const data = { ...nguoi_dung, mat_khau }
    console.log(data)
    await this.prisma.nguoi_dung.create({ data })
    throw new HttpException('Đăng ký thành công', HttpStatus.CREATED)
  }
  async loginUser(userLogin) {
    const user = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: userLogin.email
      }
    })
    if (user) {
      const checkPass = bcrypt.compareSync(userLogin.mat_khau, user.mat_khau)
      if (checkPass) {//kiểm tra mật khẩu
        throw new HttpException('Đăng nhập thành công', HttpStatus.ACCEPTED)
      } else {
        throw new HttpException('Mật khẩu không đúng', HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new HttpException('Email không đúng', HttpStatus.BAD_REQUEST)
    }
  }
  async getListImage() {
    const data = await this.prisma.hinh_anh.findMany()
    throw new HttpException({ data }, HttpStatus.ACCEPTED)

  }
  async findImageId(id) {
    const imageForid = await this.prisma.hinh_anh.findFirst({
      where: {
        hinh_id: +id
      }
    })
    console.log(imageForid)
    if (imageForid) {
      throw new HttpException({ imageForid }, HttpStatus.ACCEPTED)
    }
    throw new HttpException('Không tim thấy hình theo id', HttpStatus.BAD_REQUEST)

  }

  async getImageIdUser(id) {
    const img = await this.prisma.hinh_anh.findFirst({
      include: {
        nguoi_dung: true,
      },
      where: {
        hinh_id: +id
      }
    })
    if (img) {
      return successCode(HttpStatus.ACCEPTED, img, 'Lấy dữ liệu thành công')
    }
    return failCode(HttpStatus.BAD_REQUEST, 'Không tìm thấy dữ liệu')

  }
  async getCommentImg(id) {
    const img = await this.prisma.hinh_anh.findFirst({
      where: {
        hinh_id: +id,
      },
      include: {
        binh_luan: true
      }
    })
    if (img) {
      return successCode(HttpStatus.ACCEPTED, img, 'Lấy dữ liệu thành công')
    }
    return failCode(HttpStatus.BAD_REQUEST, 'Không tìm thấy dữ liệu')
  }
  async getImgSaveId(id) {
    const img = await this.prisma.hinh_anh.findFirst({
      where: {
        hinh_id: +id
      }
    })
    if (img) {
      return failCode(HttpStatus.BAD_REQUEST, 'Hình đã tồn tại trong hệ thống')
    }
    return failCode(HttpStatus.ACCEPTED, 'Hình chưa được lưu')
  }
  // getCommentImgId(id){
  //   const comment = this.prisma.binh_luan.create({})
  // }
}
