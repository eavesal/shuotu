import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true
})
export class Icon extends Model<Icon> {

  @Column(DataType.STRING(32))
  @AllowNull(false)
  name: string;

  // gameId: string

  @Column(DataType.STRING(2048))
  @AllowNull(false)
  url: string;

  // the md5 is used the check if the file already uploaded
  @Column(DataType.STRING(32))
  @AllowNull(false)
  md5: string;
}
