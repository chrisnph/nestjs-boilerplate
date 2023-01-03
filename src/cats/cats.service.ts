import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { CatInput } from './inputs/cat.input';
import { DeleteCatInput } from './inputs/deleteCat.input';
import { CatInterface } from './interfaces/cat.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationService } from 'src/mongooseQueryHelper/pagination/pagination.service';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cat') private readonly catModel: PaginateModel<CatInterface>,
    // @ts-ignore
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(): Promise<CatInterface[]> {
    return await this.catModel.find().exec();
  }

  async findAllPaginated(limit, page): Promise<any> {
    const data =
      limit && page
        ? await this.catModel.paginate(
            {}, // insert monogoose query here
            {
              limit,
              page,
              sort: "-name -age"
            },
          )
        : await this.catModel.find().exec();

      

    return this.paginationService.dataTransform({
      dataFieldName: 'cats', // must follow Cat field in src/dto/cat/catType.dto.ts else graphql throws non-nullable field error
      data,
    });
  }

  async findByBreed(breed): Promise<CatInterface[]> {
    const data = await this.catModel.find({ breed: { $in: [breed] } }).exec();

    return data;
  }

  async create(createCatDto: CatInput): Promise<CatInterface> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async deleteByID(deleteCatDto: DeleteCatInput): Promise<any> {
    const deletedCat = await this.catModel.find({ id: deleteCatDto }).exec();

    this.catModel.deleteOne({ id: deleteCatDto }).exec();

    return deletedCat;
  }
}
