import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat, CatType } from './dto/catType.dto';
import { CatInput } from './inputs/cat.input';
import { DeleteCatInput } from './inputs/deleteCat.input';
import { CatByBreedInput } from './inputs/findCatByBreed.input';

@Resolver(() => CatType)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [CatType], { name: 'cats' })
  async cats() {
    try {
      return this.catsService.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  async getPage() {}

  @Query(() => [Cat], { name: 'catsPaginated' })
  async catsPaginated(
    @Args({ name: 'limit', type: () => [Number] }) limit,
    @Args({ name: 'page', type: () => [Number] }) page,
  ) {
    try {
      const data = await this.catsService.findAllPaginated(limit, page);

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  @Query(() => [CatType], { name: 'findCatBreed' })
  async findByBreed(
    @Args({ name: 'breed', type: () => [String] }) breed: [CatByBreedInput],
  ) {
    try {
      let data = await this.catsService.findByBreed(breed);

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  @Mutation(() => [CatType])
  async deleteCat(
    @Args({ name: 'id', type: () => String }) id: DeleteCatInput,
  ) {
    try {
      return await this.catsService.deleteByID(id);
    } catch (error) {
      console.error(error);
    }
  }

  @Mutation(() => CatType)
  async createCat(@Args('input') input: CatInput) {
    try {
      return this.catsService.create(input);
    } catch (error) {
      console.error(error);
    }
  }
}
