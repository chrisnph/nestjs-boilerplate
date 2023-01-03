import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsResolver } from './cats.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './cat.schema';
import { AuthMiddleware } from 'src/middlewares/auth/auth.resolver';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { PaginationService } from 'src/mongooseQueryHelper/pagination/pagination.service';
import { CatsController } from './cats.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'Cat', schema: CatSchema.plugin(mongoosePaginate) },
    ]),
  ],
  controllers: [CatsController],
  providers: [CatsResolver, CatsService, PaginationService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply middleware to all routes except graphql/ihaveaccess
    consumer.apply(AuthMiddleware).exclude('graphql/ihaveaccess').forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
