import { Type } from '@nestjs/common'
import { Int, ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  offset? = 0

  @Field(() => Int, { nullable: true })
  limit? = 20
}

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    nodes: T[]

    @Field(() => Int)
    totalCount: number

    @Field()
    hasNextPage: boolean
  }
  return PaginatedType
}
