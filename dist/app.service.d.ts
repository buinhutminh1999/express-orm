import { binh_luan } from '@prisma/client';
export declare class AppService {
    private prisma;
    sigupUser(nguoi_dung: any): Promise<void>;
    loginUser(userLogin: any): Promise<void>;
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
}
