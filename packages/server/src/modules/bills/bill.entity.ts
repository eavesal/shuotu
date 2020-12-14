import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

import { Paginated, PaginationArgs } from '../../models'
import { BillType, Category } from '../categories/category.entity'

@ObjectType()
export class Bill {
  @Field(() => Int)
  id: number

  @Field(() => BillType)
  type: BillType

  @Field(() => Date)
  time: Date

  @Field({ nullable: true })
  categoryId?: string

  @Field(() => Category, { nullable: true })
  category?: Category

  @Field(() => Int)
  amount: number
}

@ObjectType()
export class PagedBill extends Paginated(Bill) {
  @Field(() => Int)
  totalIncome: number

  @Field(() => Int)
  totalOutcome: number
}

@ArgsType()
export class BillSearchQuery extends PaginationArgs {
  @Field({ nullable: true })
  categoryId?: string

  @MinLength(1900)
  @MaxLength(9999)
  @Field(() => Int, { nullable: true })
  year?: number

  @MinLength(1)
  @MaxLength(12)
  @Field(() => Int, { nullable: true })
  month?: number
}
