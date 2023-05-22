"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const response_1 = require("./untils/response");
const moment = require("moment");
let AppService = class AppService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async sigupUser(nguoi_dung) {
        const checkUser = await this.prisma.nguoi_dung.findFirst({
            where: {
                email: nguoi_dung.email
            }
        });
        if (checkUser) {
            throw new common_1.HttpException('Email đã được đăng ký', common_1.HttpStatus.BAD_REQUEST);
        }
        const mat_khau = bcrypt.hashSync(nguoi_dung.mat_khau, 1);
        const data = Object.assign(Object.assign({}, nguoi_dung), { mat_khau });
        await this.prisma.nguoi_dung.create({ data });
        throw new common_1.HttpException('Đăng ký thành công', common_1.HttpStatus.CREATED);
    }
    async loginUser(userLogin) {
        const user = await this.prisma.nguoi_dung.findFirst({
            where: {
                email: userLogin.email
            }
        });
        if (user) {
            const checkPass = bcrypt.compareSync(userLogin.mat_khau, user.mat_khau);
            if (checkPass) {
                throw new common_1.HttpException('Đăng nhập thành công', common_1.HttpStatus.ACCEPTED);
            }
            else {
                throw new common_1.HttpException('Mật khẩu không đúng', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException('Email không đúng', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getListImage() {
        const data = await this.prisma.hinh_anh.findMany();
        throw new common_1.HttpException({ data }, common_1.HttpStatus.ACCEPTED);
    }
    async findImageId(id) {
        const imageForid = await this.prisma.hinh_anh.findFirst({
            where: {
                hinh_id: +id
            }
        });
        console.log(imageForid);
        if (imageForid) {
            throw new common_1.HttpException({ imageForid }, common_1.HttpStatus.ACCEPTED);
        }
        throw new common_1.HttpException('Không tim thấy hình theo id', common_1.HttpStatus.BAD_REQUEST);
    }
    async getImageIdUser(id) {
        const img = await this.prisma.hinh_anh.findFirst({
            include: {
                nguoi_dung: true,
            },
            where: {
                hinh_id: +id
            }
        });
        if (img) {
            return (0, response_1.successCode)(common_1.HttpStatus.ACCEPTED, img, 'Lấy dữ liệu thành công');
        }
        return (0, response_1.failCode)(common_1.HttpStatus.BAD_REQUEST, 'Không tìm thấy dữ liệu');
    }
    async getCommentImg(id) {
        const img = await this.prisma.hinh_anh.findFirst({
            where: {
                hinh_id: +id,
            },
            include: {
                binh_luan: true
            }
        });
        if (img) {
            return (0, response_1.successCode)(common_1.HttpStatus.ACCEPTED, img, 'Lấy dữ liệu thành công');
        }
        return (0, response_1.failCode)(common_1.HttpStatus.BAD_REQUEST, 'Không tìm thấy dữ liệu');
    }
    async getImgSaveId(id) {
        const img = await this.prisma.hinh_anh.findFirst({
            where: {
                hinh_id: +id
            }
        });
        if (img) {
            return (0, response_1.failCode)(common_1.HttpStatus.BAD_REQUEST, 'Hình đã tồn tại trong hệ thống');
        }
        return (0, response_1.failCode)(common_1.HttpStatus.ACCEPTED, 'Hình chưa được lưu');
    }
    async createCommentImgId(binhLuan) {
        const checkImg = await this.prisma.hinh_anh.findFirst({
            where: {
                hinh_id: +binhLuan.hinh_id
            }
        });
        const checkUser = await this.prisma.nguoi_dung.findFirst({
            where: {
                nguoi_dung_id: +binhLuan.nguoi_dung_id
            }
        });
        if (checkImg) {
            if (checkUser) {
                const ngay_binh_luan = moment(binhLuan.ngay_binh_luan, 'YYYY-MM-DD HH:mm:ss').toDate();
                const processData = Object.assign(Object.assign({}, binhLuan), { ngay_binh_luan });
                await this.prisma.binh_luan.create({ data: processData });
                return (0, response_1.successCode)(common_1.HttpStatus.CREATED, processData, 'Bình luận đã được tạo');
            }
            else {
                return (0, response_1.failCode)(common_1.HttpStatus.BAD_REQUEST, 'ID người dùng không tồn tại trong hệ thống');
            }
        }
        return (0, response_1.failCode)(common_1.HttpStatus.BAD_REQUEST, 'ID hình và người dùng không tồn tại trong hệ thống');
    }
    async getUser() {
        const user = await this.prisma.nguoi_dung.findMany();
        return (0, response_1.successCode)(common_1.HttpStatus.ACCEPTED, user, 'Lấy dữ liệu thành công');
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map