import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, binh_luan, nguoi_dung } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { failCode, successCode } from './untils/response';
import * as moment from 'moment'
import { ListUser } from './entities/auth.entity';

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
  async createCommentImgId(binhLuan: binh_luan) {
    const checkImg = await this.prisma.hinh_anh.findFirst({
      where: {
        hinh_id: +binhLuan.hinh_id
      }
    })
    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: +binhLuan.nguoi_dung_id
      }
    })
    if (checkImg) {
      if (checkUser) {
        const ngay_binh_luan = moment(binhLuan.ngay_binh_luan, 'YYYY-MM-DD HH:mm:ss').toDate()
        const processData = { ...binhLuan, ngay_binh_luan }
        await this.prisma.binh_luan.create({ data: processData })
        return successCode(HttpStatus.CREATED, processData, 'Bình luận đã được tạo')
      } else {
        return failCode(HttpStatus.BAD_REQUEST, 'ID người dùng không tồn tại trong hệ thống')
      }
    }
    return failCode(HttpStatus.BAD_REQUEST, 'ID hình và người dùng không tồn tại trong hệ thống')
  }
  async getUser() {
    const user = await this.prisma.nguoi_dung.findMany()
    return successCode(HttpStatus.ACCEPTED, user, 'Lấy dữ liệu thành công')
  }
}
