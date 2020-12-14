import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true
})
export class Game extends Model<Game> {
  @AllowNull(false)
  @Column(DataType.STRING(128))
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING(2048))
  cover: string;
}
