import { Module } from '@nestjs/common'

import { CATEGORIES_CSV_FILE_PATH } from '../../constants'

import { CategoryService, configureCategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'

@Module({
  providers: [
    configureCategoryService(CATEGORIES_CSV_FILE_PATH),
    CategoryResolver,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
