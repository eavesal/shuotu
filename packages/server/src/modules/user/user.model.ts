import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript'
import { enumValues } from '../../utils'

export enum Roles {
  ADMIN = 'ADMIN',
  CORE_CONTRIBUTOR = 'CORE_CONTRIBUTOR',
  MAP_ADMIN = 'MAP_ADMIN',
  MAP_CONTRIBUTOR = 'MAP_CONTRIBUTOR',
  USER = 'USER',
}

export const RolesOrder = [Roles.ADMIN, Roles.CORE_CONTRIBUTOR, Roles.MAP_ADMIN, Roles.MAP_CONTRIBUTOR, Roles.USER]

@Table({
  timestamps: true,
})
export class User extends Model<User> {
  @AllowNull(false)
  @Column(DataType.STRING(32))
  username: string

  @AllowNull(false)
  @Column(DataType.STRING(64))
  password: string

  @Column(DataType.STRING(16))
  phoneNumber: string

  @Column(DataType.ENUM(...enumValues(Roles)))
  role: Roles
}
