import { PrimaryGeneratedColumn } from 'typeorm';
import { Constructor, Mixin } from '../helpers/compose';

type WithPrimaryUUIDProps = {
  id: string;
};

export const WithPrimaryUUID: Mixin<WithPrimaryUUIDProps> = <
  TBase extends Constructor,
>(
  Base: TBase,
) => {
  abstract class WithPrimaryUUIDMixin extends Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  }

  return WithPrimaryUUIDMixin as unknown as Constructor<
    InstanceType<TBase> & WithPrimaryUUIDProps
  >;
};
