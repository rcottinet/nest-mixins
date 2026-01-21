import { Repository, FindOptionsWhere } from 'typeorm';
import { Constructor, Mixin } from '../utils/compose';

// Define the interface that the base must have
export interface WithRepository<T> {
  repository: Repository<T>;
}

type WithCrudProps<T = any, PK = any> = {
  create(entity: Partial<T>): Promise<T>;
  read(pk: PK): Promise<T | null>;
  update(pk: PK, entity: Partial<T>): Promise<T | null>;
  delete(pk: PK): Promise<void>;
};

type PrimaryKeyFields<TEntity> = keyof TEntity | (keyof TEntity)[];

export function WithCrud<TEntity, PK = any>(
  primaryKeyFields: PrimaryKeyFields<TEntity> = 'id' as keyof TEntity,
): Mixin<WithCrudProps<TEntity, PK>> {
  const isCompositePK = Array.isArray(primaryKeyFields);
  const pkFields = isCompositePK ? primaryKeyFields : [primaryKeyFields];

  const buildWhereClause = (pk: PK): FindOptionsWhere<TEntity> => {
    if (isCompositePK) {
      // pk should be an object with composite keys
      const pkObj = pk as any;
      return pkFields.reduce((acc, field) => {
        acc[field] = pkObj[field];
        return acc;
      }, {} as any) as FindOptionsWhere<TEntity>;
    } else {
      // Single primary key
      return {
        [pkFields[0]]: pk,
      } as FindOptionsWhere<TEntity>;
    }
  };

  return <TBase extends Constructor>(Base: TBase) => {
    abstract class WithCrudMixin extends Base {
      async create(entity: Partial<TEntity>): Promise<TEntity> {
        const repository = (this as any).repository as Repository<TEntity>;
        const newEntity = repository.create(entity as any);
        return repository.save(newEntity) as Promise<TEntity>;
      }

      async read(pk: PK): Promise<TEntity | null> {
        const repository = (this as any).repository as Repository<TEntity>;
        return repository.findOneBy(buildWhereClause(pk));
      }

      async update(pk: PK, entity: Partial<TEntity>): Promise<TEntity | null> {
        const repository = (this as any).repository as Repository<TEntity>;
        await repository.update(buildWhereClause(pk), entity as any);
        return repository.findOneBy(buildWhereClause(pk));
      }

      async delete(pk: PK): Promise<void> {
        const repository = (this as any).repository as Repository<TEntity>;
        await repository.delete(buildWhereClause(pk));
      }
    }

    return WithCrudMixin as unknown as Constructor<
      InstanceType<TBase> & WithCrudProps<TEntity, PK>
    >;
  };
}
