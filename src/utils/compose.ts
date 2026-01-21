export type Constructor<T = object> = abstract new (...args: any[]) => T;

export type Mixin<TAdded> = <TBase extends Constructor>(
  base: TBase,
) => Constructor<InstanceType<TBase> & TAdded>;

export function compose<
  TBase extends Constructor,
  TMixins extends readonly Mixin<any>[],
>(
  Base: TBase,
  ...mixins: TMixins
): Constructor<
  InstanceType<TBase> &
    UnionToIntersection<
      TMixins[number] extends Mixin<infer TAdded> ? TAdded : never
    >
> {
  return mixins.reduce((acc, mixin) => mixin(acc), Base) as any;
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
