import { PrimaryGeneratedColumn } from 'typeorm';
import { Constructor } from '../helpers/compose';

export function WithPrimaryUUID<TBase extends Constructor>(Base: TBase) {
  class WithPrimaryUUID extends Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  }
  return WithPrimaryUUID;
}
