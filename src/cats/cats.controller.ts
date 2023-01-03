import { Controller, Post, Request } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  // @ts-ignore
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async findAllPaginated(@Request() request): Promise<any> {
    const { limit, page } = request.body;

    const data = await this.catsService.findAllPaginated(limit, page);

    return data;
  }
}
