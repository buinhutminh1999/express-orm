import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, binh_luan, nguoi_dung, luu_anh, hinh_anh } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { failCode, successCode } from './untils/response';
import * as moment from 'moment'
import { ListUser } from './entities/auth.entity';
import { check } from 'prettier';

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
    const mat_khau = bcrypt.hashSync(nguoi_dung.mat_khau, 10)
    const data = { ...nguoi_dung, mat_khau }
    await this.prisma.nguoi_dung.create({ data })
    throw new HttpException('Đăng ký thành công', HttpStatus.CREATED)
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

  async getImgId(id: string, idimg: string) {
    console.log(idimg)
    const saveImg = await this.prisma.luu_anh.findMany({
      where: {
        hinh_id: +id,
        nguoi_dung_id: +idimg
      }
    })
    console.log('saveImg', saveImg)
    if (saveImg.length !== 0) {
      return successCode(HttpStatus.ACCEPTED, saveImg, 'Lấy dữ liệu thành công')
    }
    return failCode(HttpStatus.BAD_REQUEST, 'Không tìm thấy hình ảnh nào đã lưu')
  }

  async getImgUserId(userid: string) {
    const checkImg = await this.prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: +userid
      }
    })
    if (checkImg.length !== 0) {
      return successCode(HttpStatus.ACCEPTED, checkImg, 'Lấy dữ liệu thành công')
    }
    return failCode(HttpStatus.BAD_REQUEST, 'Không tìm thấy hình ảnh nào đã tạo theo userid')
  }
  async deleUserImg(id: string) {
    const checkImg = await this.prisma.hinh_anh.findFirst({
      where: {
        hinh_id: +id
      }
    })

    if (checkImg) {
      await this.prisma.hinh_anh.delete({
        where: {
          hinh_id: +id
        }
      })
      return successCode(HttpStatus.ACCEPTED, checkImg, 'Xóa thành công')
    }
    return failCode(HttpStatus.BAD_REQUEST, 'Không tìm thấy hình ảnh nào')
  }
  async uploadImgUser(file: Express.Multer.File, body: hinh_anh) {
    const newData = { ...body, duong_dan: file.filename }
    await this.prisma.hinh_anh.create({ data: newData })
    return 'thành công'
  }

  async updateUser(body: nguoi_dung) {
    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: +body.nguoi_dung_id,
      }
    })
    if (checkUser) {
      const mat_khau = bcrypt.hashSync(body.mat_khau, 10)
      const newUser = { ...body, mat_khau }
      await this.prisma.nguoi_dung.update({
        data: newUser, where: {
          nguoi_dung_id: +body.nguoi_dung_id
        }
      })
      return successCode(HttpStatus.ACCEPTED, newUser, 'Cập nhật thành công')
    }
    return failCode(HttpStatus.BAD_REQUEST, 'Cập nhật thất bai')
  }
}
