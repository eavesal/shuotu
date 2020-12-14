import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';


@Table({
  timestamps: true
})
export class ResourceCategory extends Model<ResourceCategory> {
  @Column(DataType.STRING(64))
  @AllowNull(false)
  name: string

  @Column(DataType.INTEGER)
  @AllowNull(false)
  order: number
}
