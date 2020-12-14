import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { createGraphQLModule } from './utils'

import { BillModule } from '../src/modules/bills/bill.module'

const GET_BILLS_QUERY = `
query {
  getBills(offset: 1, limit: 1, categoryId: "0fnhbcle6hg") {
    hasNextPage
    totalCount
    nodes {
      id
    }
  }
}
`

const TOTAL_INCOME_AND_OUTCOME_QUERY = `
query {
  totalIncome
  totalOutcome
}
`

describe('Bill Module (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await createGraphQLModule(BillModule)

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('GET_BILL_QUERY', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: GET_BILLS_QUERY,
        variables: {},
      })
      .expect(200)
      .expect(
        '{"data":{"getBills":{"hasNextPage":true,"totalCount":6,"nodes":[{"id":17}]}}}\n',
      )
  })

  it('TOTAL_INCOME_AND_OUTCOME_QUERY', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: TOTAL_INCOME_AND_OUTCOME_QUERY,
        variables: {},
      })
      .expect(200)
      .expect('{"data":{"totalIncome":134000,"totalOutcome":104800}}\n')
  })
})
