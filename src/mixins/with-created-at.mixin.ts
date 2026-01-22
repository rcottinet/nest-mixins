import { CreateDateColumn } from 'typeorm';
import { Constructor } from '../helpers/compose';

export function WithCreatedAt<TBase extends Constructor>(Base: TBase) {
  class WithCreatedAt extends Base {
    @CreateDateColumn()
    createdAt!: Date;
  }
  return WithCreatedAt;
}
