import { compose } from './helpers/compose';
import { BaseEntity, Entity } from 'typeorm';
import { WithCreatedAt } from './mixins/with-created-at.mixin';
import { WithUpdatedAt } from './mixins/with-updated-at.mixin';
import { WithDeletedAt } from './mixins/with-deleted-at.mixin';
import { WithPrimaryUUID } from './mixins/with-primary-uuid.mixin';
import { WithAddress } from './mixins/with-address.mixin';

@Entity()
export class User extends compose(
  BaseEntity,
  WithPrimaryUUID,
  WithCreatedAt,
  WithUpdatedAt,
  WithDeletedAt,
  WithAddress,
) {}
