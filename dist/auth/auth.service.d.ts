import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    private prisma;
    loginUser(userLogin: any, res: any): Promise<{
        status: number;
        data: any;
        message: string;
    }>;
}
