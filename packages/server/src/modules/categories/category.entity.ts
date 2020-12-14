import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

export enum BillType {
  OUTCOME = 0,
  INCOME = 1,
}

@ObjectType()
export class Category {
  @Field()
  id: string

  @Field(() => BillType)
  type: BillType

  @Field()
  name: string
}

registerEnumType(BillType, {
  name: 'BillType',
})
