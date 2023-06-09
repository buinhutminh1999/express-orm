"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const passport_1 = require("@nestjs/passport");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    sigupUser(body) {
        return this.appService.sigupUser(body);
    }
    getListImage() {
        return this.appService.getListImage();
    }
    findImageId(id) {
        return this.appService.findImageId(id);
    }
    getImageIdUser(id) {
        return this.appService.getImageIdUser(id);
    }
    getCommentImg(id) {
        return this.appService.getCommentImg(id);
    }
    getImgSaveId(id) {
        return this.appService.getImgSaveId(id);
    }
    createCommentImgId(body) {
        return this.appService.createCommentImgId(body);
    }
    getUser() {
        return this.appService.getUser();
    }
    getImgId(userid, idimg) {
        return this.appService.getImgId(userid, idimg);
    }
    getImgUserId(userid) {
        return this.appService.getImgUserId(userid);
    }
    deleUserImg(id) {
        return this.appService.deleUserImg(id);
    }
    uploadImgUser(file, body) {
        return this.appService.uploadImgUser(file, body);
    }
    updateUser(body) {
        return this.appService.updateUser(body);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sigupUser", null);
__decorate([
    (0, common_1.Get)('/get-image'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getListImage", null);
__decorate([
    (0, common_1.Get)('/get-image/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findImageId", null);
__decorate([
    (0, common_1.Get)('/get-user-image/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getImageIdUser", null);
__decorate([
    (0, common_1.Get)('/get-comment-image/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCommentImg", null);
__decorate([
    (0, common_1.Get)('/get-image-save/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getImgSaveId", null);
__decorate([
    (0, common_1.Post)('/comment-img-id/:id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCommentImgId", null);
__decorate([
    (0, common_1.Get)('/get-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/img-save/:userid/:idimg'),
    __param(0, (0, common_1.Param)('userid')),
    __param(1, (0, common_1.Param)('idimg')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getImgId", null);
__decorate([
    (0, common_1.Get)('/img-user/:userid'),
    __param(0, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getImgUserId", null);
__decorate([
    (0, common_1.Delete)('/delete-img/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleUserImg", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + '/public/imgs',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, file.fieldname + '-' + uniqueSuffix);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadImgUser", null);
__decorate([
    (0, common_1.Put)('/update-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateUser", null);
AppController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map