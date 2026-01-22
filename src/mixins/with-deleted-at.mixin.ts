import { DeleteDateColumn } from 'typeorm';
import { Constructor } from '../helpers/compose';

export function WithDeletedAt<TBase extends Constructor>(Base: TBase) {
  class WithDeletedAt extends Base {
    @DeleteDateColumn()
    deletedAt!: Date;
  }
  return WithDeletedAt;
}
