import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/middleware/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, JwtModule.register({
    global: true,
  })],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],

})
export class AppModule { }
