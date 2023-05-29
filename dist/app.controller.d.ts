/// <reference types="multer" />
import { AppService } from './app.service';
import { binh_luan, hinh_anh, nguoi_dung } from '@prisma/client';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sigupUser(body: nguoi_dung): Promise<void>;
    getListImage(): Promise<void>;
    findImageId(id: string): Promise<void>;
    getImageIdUser(id: string): Promise<{
        status: number;
        message: string;
    }>;
    getCommentImg(id: string): Promise<{
        status: number;
        message: string;
    }>;
    getImgSaveId(id: string): Promise<{
        status: number;
        message: string;
    }>;
    createCommentImgId(body: binh_luan): Promise<{
        status: number;
        message: string;
    }>;
    getUser(): Promise<{
        status: number;
        token: any;
        message: string;
        data?: undefined;
    } | {
        status: number;
        data: any;
        message: string;
        token?: undefined;
    }>;
    getImgId(userid: string, idimg: string): Promise<{
        status: number;
        message: string;
    }>;
    getImgUserId(userid: string): Promise<{
        status: number;
        message: string;
    }>;
    deleUserImg(id: string): Promise<{
        status: number;
        message: string;
    }>;
    uploadImgUser(file: Express.Multer.File, body: hinh_anh): Promise<string>;
    updateUser(body: nguoi_dung): Promise<{
        status: number;
        message: string;
    }>;
}
