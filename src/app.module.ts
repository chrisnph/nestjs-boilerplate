import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { BannersModule } from './banners/banners.module';
import { BannerUploadProcessor } from './banners/bannerUpload.processor';
import { CatsModule } from './cats/cats.module';
import { GraphqlOptions } from './helpers';

config({ path: `${process.cwd()}/environments/.env` });
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlOptions,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    CatsModule,
    BannersModule,
    BannerUploadProcessor
  ],
})
export class AppModule {}
