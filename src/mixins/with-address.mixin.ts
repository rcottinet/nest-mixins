import { Column } from 'typeorm';
import { Constructor } from '../helpers/compose';

export function WithAddress<TBase extends Constructor>(Base: TBase) {
  class WithAddress extends Base {
    @Column()
    country: string;

    @Column()
    city: string;
  }
  return WithAddress;
}
