import { AppService } from './app.service';
import { binh_luan, nguoi_dung } from '@prisma/client';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sigupUser(body: nguoi_dung): Promise<void>;
    loginUser(body: any): Promise<void>;
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
        data: any;
        message: string;
    }>;
}
