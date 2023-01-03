import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from 'src/firebase/firebase.service';
import { BannerInterface } from './interfaces/banner.interface';
import { QueuesManagerService } from 'src/QueueManager/queueManager.service';

@Injectable()
export class BannersService {
  constructor(
    // @ts-ignore
    @InjectModel('Banner') private readonly bannerModel: Model<BannerInterface>,
    // @InjectQueue('upload-banner-queue') private fileQueue: Queue,
    private readonly firebaseService: FirebaseService,
    private queuesManagerService: QueuesManagerService,
  ) {}

  async addQueue(request) {
    const job = await this.queuesManagerService.generateQueue(
      'upload-banner-queue',
      request.body,
    );

    return job;
  }

  async getQueue(request) {
    const job = await this.queuesManagerService.getAllJobsFromQueue(
      'upload-banner-queue',
      request.body,
    );

    return job;
  }

  async uploadSingle(file): Promise<any> {
    if (!file) throw new NotAcceptableException('invalid file');

    const fileOriginalName = file.originalname;
    const fileExtension = fileOriginalName.split('.').splice(-1);
    const newFileName = `${fileOriginalName.replace(
      '.' + fileExtension,
      '',
    )}${Date.now()}.${fileExtension}`;

    const signedUrls = await this.firebaseService.uploadSingleFile({
      file,
      fileName: newFileName,
      filePath: `banners/${newFileName}`,
    });

    return this.bannerModel.create({
      name: newFileName,
      path: signedUrls,
      sort: 1,
      active: true,
    });
  }
}
