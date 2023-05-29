import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends
    PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY,
        });
    }

    //khi user hợp lệ sẽ nhảy qua đây, xác thực thành công
    async validate(payload: any) {//payload: mã hóa token là chuỗi json
        console.log(payload)
        return payload;
    }
}