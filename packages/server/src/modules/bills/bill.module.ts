import { Module } from '@nestjs/common'

import { BILL_CSV_FILE_PATH } from '../../constants'
import { DateScalar } from '../../scalars/DateScalar'

import { configureBillService } from './bill.service'
import { BillResolver } from './bill.resolver'
import { CategoryModule } from '../categories/category.module'

@Module({
  providers: [
    configureBillService(BILL_CSV_FILE_PATH),
    BillResolver,
    DateScalar,
  ],
  exports: [],
  imports: [CategoryModule],
})
export class BillModule {}
