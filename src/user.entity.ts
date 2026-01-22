import { compose } from './helpers/compose';
import { BaseEntity, Entity } from 'typeorm';
import { WithCreatedAt } from 'src/mixins/with-created-at.mixin';
import { WithUpdatedAt } from 'src/mixins/with-updated-at.mixin';
import { WithDeletedAt } from 'src/mixins/with-deleted-at.mixin';
import { WithPrimaryUUID } from './mixins/with-primary-uuid.mixin';

@Entity()
export class User extends compose(
  BaseEntity,
  WithPrimaryUUID,
  WithCreatedAt,
  WithUpdatedAt,
  WithDeletedAt,
) {}
