import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class Game {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  cover: string
}