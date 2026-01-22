import { UpdateDateColumn } from 'typeorm';
import { Constructor } from '../helpers/compose';

export function WithUpdatedAt<TBase extends Constructor>(Base: TBase) {
  class WithUpdatedAt extends Base {
    @UpdateDateColumn()
    updatedAt!: Date;
  }
  return WithUpdatedAt;
}
