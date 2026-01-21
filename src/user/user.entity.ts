import { compose } from '../utils/compose';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';
import { WithCreatedAt } from 'src/common/entity-with-created-at.mixin';
import { WithUpdatedAt } from 'src/common/entity-with-updated-at.mixin';
import { WithDeletedAt } from 'src/common/entity-with-deleted-at.mixin';

@Entity()
export class User extends compose(
  BaseEntity,
  WithCreatedAt,
  WithUpdatedAt,
  WithDeletedAt,
) {
  @PrimaryColumn()
  id: number;
}
