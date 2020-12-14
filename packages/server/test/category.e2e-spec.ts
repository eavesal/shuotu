import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { createGraphQLModule } from './utils'

import { CategoryModule } from '../src/modules/categories/category.module'

const GET_CATEGORIES_QUERY = `
query {
  categories {
    id
  }
}
`

describe('Bill Module (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await createGraphQLModule(CategoryModule)

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('GET_BILL_QUERY', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: GET_CATEGORIES_QUERY,
        variables: {},
      })
      .expect(200)
      .expect(
        '{"data":{"categories":[{"id":"1bcddudhmh"},{"id":"hc5g66kviq"},{"id":"8s0p77c323"},{"id":"0fnhbcle6hg"},{"id":"odrjk823mj8"},{"id":"bsn20th0k2o"},{"id":"j1h1nohhmmo"},{"id":"3tqndrjqgrg"},{"id":"s73ijpispio"},{"id":"1vjj47vpd28"},{"id":"5il79e11628"}]}}\n',
      )
  })
})
