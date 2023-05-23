import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { binh_luan, nguoi_dung } from '@prisma/client';
import { ListUser } from './entities/auth.entity';

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
  @Post('/comment-img-id/:id')
  createCommentImgId(@Body() body: binh_luan) {
    return this.appService.createCommentImgId(body)
  }
  @Get('/get-user')
  getUser() {
    return this.appService.getUser()
  }
  @Get('/img-save/:userid/:idimg')
  getImgId(
    @Param('userid') userid: string,
    @Param('idimg') idimg: string) {
    return this.appService.getImgId(userid, idimg)
  }
  @Get('/img-user/:userid')
  getImgUserId(@Param('userid') userid: string) {
    return this.appService.getImgUserId(userid)
  }
  @Delete('/delete-img/:id')
  deleUserImg(@Param('id') id: string) {
    return this.appService.deleUserImg(id)
  }
}
