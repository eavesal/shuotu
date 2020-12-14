import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

import {
  Bill,
  BillSearchQuery,
  PagedBill,
} from '../../modules/bills/bill.entity'
import { BillService } from '../../modules/bills/bill.service'
import { BillType, Category } from '../categories/category.entity'
import { CategoryService } from '../categories/category.service'

@Resolver(() => Bill)
export class BillResolver {
  constructor(
    private categoryService: CategoryService,
    private billsService: BillService,
  ) {}

  @Query(() => PagedBill)
  async getBills(
    @Args({ type: () => BillSearchQuery }) args: BillSearchQuery,
  ): Promise<PagedBill> {
    const bills = await this.billsService.getAll(
      args.categoryId,
      args.year,
      args.month,
    )
    return this.billsService.page(bills, args.offset, args.limit)
  }

  @ResolveField('category', () => Category)
  async category(@Parent() bill: Bill) {
    const { categoryId } = bill
    return this.categoryService.getById(categoryId)
  }

  @Query(() => Int)
  async totalIncome() {
    return this.billsService.getTotalIncome(await this.billsService.getAll())
  }

  @Query(() => Int)
  async totalOutcome() {
    return this.billsService.getTotalOutcome(await this.billsService.getAll())
  }

  @Query(() => [String])
  async avaliableDates() {
    return this.billsService.getAvaliableDates()
  }

  @Mutation(() => Bill)
  async createBill(
    @Args({
      name: 'type',
      type: () => BillType,
    })
    billType: BillType,
    @Args({
      name: 'amount',
      type: () => Int,
    })
    amount: number,
  ) {
    return this.billsService.createBill(billType, amount)
  }
}
