import { AuthService } from './auth.service';
import { nguoi_dung } from '@prisma/client';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(body: nguoi_dung, res: Response): Promise<{
        status: number;
        data: any;
        message: string;
    }>;
}
