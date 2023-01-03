import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { BannersService } from './banners.service';

@Controller('banners')
export class BannersController {
  constructor(
    @InjectQueue('upload-banner-queue') private fileQueue: Queue,
    private readonly bannersService: BannersService,
  ) {}

  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Array<Express.Multer.File>) {
    return this.bannersService.uploadSingle(file);
  }

  @Post('queues')
  async getQueue(@Request() request): Promise<any> {
    const data = await this.bannersService.getQueue(request);
    return data;
  }

  @Post('queues/add')
  async addQueue(@Request() request): Promise<any> {
    const data = await this.bannersService.addQueue(request);
    return data;
  }
}
