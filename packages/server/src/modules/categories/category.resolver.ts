import { Query, Resolver } from '@nestjs/graphql'

import { Category } from '../categories/category.entity'
import { CategoryService } from './category.service'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories() {
    return await this.categoryService.getAll()
  }
}
