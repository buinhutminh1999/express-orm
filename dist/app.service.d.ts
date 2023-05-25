/// <reference types="multer" />
import { binh_luan, nguoi_dung, hinh_anh } from '@prisma/client';
export declare class AppService {
    private prisma;
    sigupUser(nguoi_dung: any): Promise<void>;
    getListImage(): Promise<void>;
    findImageId(id: any): Promise<void>;
    getImageIdUser(id: any): Promise<{
        status: number;
        message: string;
    }>;
    getCommentImg(id: any): Promise<{
        status: number;
        message: string;
    }>;
    getImgSaveId(id: any): Promise<{
        status: number;
        message: string;
    }>;
    createCommentImgId(binhLuan: binh_luan): Promise<{
        status: number;
        message: string;
    }>;
    getUser(): Promise<{
        status: number;
        data: any;
        message: string;
    }>;
    getImgId(id: string, idimg: string): Promise<{
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
