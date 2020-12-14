import { Injectable } from '@nestjs/common'
import csvdb from 'csv-database'
import { add, filter, last, max, reduce, slice } from 'ramda'

import { CSVDBType } from '../../global.type'
import { BillType } from '../categories/category.entity'

import { Bill } from './bill.entity'

export function configureBillService(filepath: string) {
  return {
    provide: BillService,
    useFactory: async () => {
      const db = await csvdb(
        filepath,
        ['id', 'type', 'time', 'categoryId', 'amount'],
        ',',
      )
      const all = await db.get()
      const maxIndex = reduce<number[], number>(
        max,
        0,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        all.map((x) => +x.id) as number[],
      )

      return new BillService(db, maxIndex + 1)
    },
  }
}

@Injectable()
export class BillService {
  index = 0
  db: CSVDBType

  constructor(db: CSVDBType, index: number) {
    this.db = db
    this.index = index
  }

  convertType({
    amount,
    time,
    id,
    type,
    categoryId,
  }: Record<string, unknown>): Bill {
    return {
      id: +id,
      type: +type,
      categoryId,
      amount: +amount,
      time: new Date(+time),
    } as Bill
  }

  convertTypes(items: Record<string, unknown>[]): Bill[] {
    return items.map(this.convertType)
  }

  async createBill(type: BillType, amount: number) {
    const bill = await this.db.add({
      id: this.index++,
      type,
      amount,
      time: +new Date(),
    })
    return this.convertType(bill[0] as any)
  }

  async deleteById(id: number) {
    await this.db.delete({
      id,
    })
  }

  static filterByDate(year: number, month: number) {
    return (bill: Bill) => {
      if (
        bill.time.getFullYear() !== year ||
        bill.time.getMonth() + 1 !== month
      ) {
        return false
      }

      return true
    }
  }

  page(bills: Bill[], offset: number, limit: number) {
    const totalCount = bills.length
    const currentPageItems = slice(offset, offset + limit, bills)

    return {
      totalIncome: this.getTotalIncome(bills),
      totalOutcome: this.getTotalOutcome(bills),
      nodes: currentPageItems,
      totalCount,
      hasNextPage:
        currentPageItems.length !== 0 &&
        last(bills).id !== last(currentPageItems).id,
    }
  }

  async getAll(categoryId?: string, year?: number, month?: number) {
    let bills = this.convertTypes((await this.db.get()) as any).sort(
      (a, b) => b.time.getTime() - a.time.getTime(),
    )

    if (categoryId) {
      bills = filter((bill) => bill.categoryId === categoryId, bills)
    }

    if (year && month) {
      const filterBy = BillService.filterByDate(year, month)
      bills = filter(filterBy, bills)
    }

    return bills
  }

  getTotalIncome(bills: Bill[]) {
    return bills
      .filter((x) => x.type === BillType.INCOME)
      .map((x) => x.amount)
      .reduce(add, 0)
  }

  getTotalOutcome(bills: Bill[]) {
    return bills
      .filter((x) => x.type === BillType.OUTCOME)
      .map((x) => x.amount)
      .reduce(add, 0)
  }

  async getAvaliableDates() {
    const bills = await this.getAll()
    const avaliableDates = new Set<string>()
    bills.forEach((bill) => {
      const month = bill.time.getMonth() + 1
      avaliableDates.add(
        `${bill.time.getFullYear()}-${month > 9 ? month : `0${month}`}`,
      )
    })
    return [...avaliableDates]
  }
}
