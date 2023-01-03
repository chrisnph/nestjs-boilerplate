import { Resolver } from "@nestjs/graphql";
import { BannersService } from "./banners.service";
import { BannerType } from "./dto/bannerType.dto";

@Resolver(() => BannerType)
export class BannersResolver {
    // @ts-ignore
  constructor(private readonly bannersService: BannersService) {}

  async getPage() {}
}
