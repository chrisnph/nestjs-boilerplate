import {
  OnQueueActive,
  OnQueueError,
  Process,
  Processor,
  OnQueueFailed,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('upload-banner-queue')
export class BannerUploadProcessor {
  @OnQueueActive()
  onActive(job: Job) {
    setTimeout(() => {
      Logger.log(
        `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
      );
    }, 1000);
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    setTimeout(() => {
      Logger.log(
        `Completed job ${job.id} of type ${job.name} with data ${job.data}...`,
      );
    }, 2000);
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    Logger.error(
      `Failed job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueError()
  onError(job: Job) {
    Logger.error(
      `Error job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process('upload-banner-queue')
  async handleUploadBannerQueue(job: Job) {
    Logger.log('\n\nQueued[upload-banner-queue]');
  }
}
