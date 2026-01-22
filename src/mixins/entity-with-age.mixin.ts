import { Column } from 'typeorm';
import { Constructor, Mixin } from '../utils/compose';

type WithAgeProps = {
  age: number;
};

export const WithAge: Mixin<WithAgeProps> = <TBase extends Constructor>(
  Base: TBase,
) => {
  abstract class WithAgeMixin extends Base {
    @Column()
    age: number;
  }

  return WithAgeMixin as unknown as Constructor<
    InstanceType<TBase> & WithAgeProps
  >;
};
