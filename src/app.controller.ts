import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { nguoi_dung } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/signup')
  sigupUser(@Body() body: nguoi_dung) {
    return this.appService.sigupUser(body)
  }
  @Post('/login')
  loginUser(@Body() body) {
    return this.appService.loginUser(body)
  }
  @Get('/get-image')
  getListImage() {
    return this.appService.getListImage()
  }
  @Get('/get-image/:id')
  findImageId(@Param('id') id: string) {
    return this.appService.findImageId(id)
  }
  @Get('/get-user-image/:id')
  getImageIdUser(@Param('id') id: string) {
    return this.appService.getImageIdUser(id)
  }
  @Get('/get-comment-image/:id')
  getCommentImg(@Param('id') id: string) {
    return this.appService.getCommentImg(id)
  }
  @Get('/get-image-save/:id')
  getImgSaveId(@Param('id') id: string) {
    return this.appService.getImgSaveId(id)
  }
  // @Get('/get-comment-imgid/:id')
  // // getCommentImgId(@Param('id') id: string){
  // //   return this.appService.getCommentImgId(id)
  // // }
}
