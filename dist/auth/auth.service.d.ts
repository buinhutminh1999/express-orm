import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    private prisma;
    loginUser(userLogin: any): Promise<{
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
