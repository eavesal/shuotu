import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';
import { enumValues } from '../../utils';

export enum LinkSourceTypes {
  RESOURCE = 'resource',
  POINT_ANNOTATION = 'point_annotation',
}

export enum LinkTargetTypes {
  ARTICAL = 'ARTICAL',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}


@Table({
  timestamps: true
})
export class Link extends Model<Link> {

  @Column(DataType.STRING(128))
  @AllowNull(true)
  name?: string;

  // gameId: string

  @Column(DataType.ENUM(...enumValues(LinkSourceTypes)))
  @AllowNull(false)
  sourceType: LinkSourceTypes;

  @Column(DataType.ENUM(...enumValues(LinkTargetTypes)))
  @AllowNull(false)
  targetType: LinkTargetTypes;

  @Column(DataType.STRING(2048))
  @AllowNull(false)
  link: string;
}
