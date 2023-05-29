import { nguoi_dung } from '@prisma/client';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(body: nguoi_dung): Promise<{
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
}
