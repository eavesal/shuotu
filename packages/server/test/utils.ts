import { Type } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test } from '@nestjs/testing'

export async function createGraphQLModule(module: Type<any>) {
  return Test.createTestingModule({
    imports: [
      GraphQLModule.forRoot({
        debug: false,
        playground: false,
        autoSchemaFile: true,
      }),
      module,
    ],
  }).compile()
}
