import { Injectable } from '@nestjs/common'
import csvdb from 'csv-database'

import { CSVDBType } from '../../global.type'

import { Category } from './category.entity'

export function configureCategoryService(filepath: string) {
  return {
    provide: CategoryService,
    useFactory: async () => {
      const db = await csvdb(filepath, ['id', 'type', 'name'], ',')
      return new CategoryService(db)
    },
  }
}

@Injectable()
export class CategoryService {
  index = 0
  db: CSVDBType

  constructor(db: CSVDBType) {
    this.db = db
  }

  convertTypes(items: Record<string, unknown>[]): Category[] {
    return items.map(
      ({ id, type, name }) =>
        ({
          id,
          type: +type,
          name,
        } as Category),
    )
  }

  async getAll() {
    return this.convertTypes((await this.db.get()) as any)
  }

  async getById(id: string) {
    const categories = this.convertTypes(
      (await this.db.get({
        id,
      })) as any,
    )

    if (categories.length > 0) {
      return categories[0]
    }
    return undefined
  }
}
