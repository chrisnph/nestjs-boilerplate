import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthMiddleware } from 'src/middlewares/auth/auth.resolver';
import { QueuesManagerService } from 'src/QueueManager/queueManager.service';
import { BannerSchema } from './banner.schema';
import { BannersController } from './banners.controller';
import { BannersResolver } from './banners.resolver';
import { BannersService } from './banners.service';
// @ts-ignore
import { BannerType } from './dto/bannerType.dto';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'Banner', schema: BannerSchema.plugin(mongoosePaginate) },
    ]),
    BullModule.registerQueue({
      name: 'upload-banner-queue',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [BannersController],
  providers: [
    BannersResolver,
    BannersService,
    FirebaseService,
    BannerType,
    QueuesManagerService,
  ],
})
export class BannersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply middleware to all routes except graphql/ihaveaccess
    consumer.apply(AuthMiddleware).exclude('graphql/ihaveaccess').forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
