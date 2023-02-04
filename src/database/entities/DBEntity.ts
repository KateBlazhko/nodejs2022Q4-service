import { isEqual } from 'lodash';

type UnpackArray<T> = T extends (infer R)[] ? R : never;
interface Options<T, K extends keyof T> {
  key: K;
  equals?: T[K];
  equalsAnyOf?: T[K][];
  inArray?: UnpackArray<T[K]>;
  inArrayAnyOf?: UnpackArray<T[K]> extends never ? never : UnpackArray<T[K]>[];
}
type OptionsEquals<T, K extends keyof T> = Required<Pick<Options<T, K>, 'key' | 'equals'>>;
type OptionsEqualsAnyOf<T, K extends keyof T> = Required<
  Pick<Options<T, K>, 'key' | 'equalsAnyOf'>
>;
type OptionsInArray<T, K extends keyof T> = Required<Pick<Options<T, K>, 'key' | 'inArray'>>;
type OptionsInArrayAnyOf<T, K extends keyof T> = Required<
  Pick<Options<T, K>, 'key' | 'inArrayAnyOf'>
>;

export default abstract class DBEntity<Entity extends { id: string }, ChangeDTO, CreateDTO> {
  protected entities: Entity[] = [];

  // abstract create(createDto: CreateDTO): Promise<Entity>;

  private runChecks<T extends Entity, K extends keyof T>(entity: T, options: Options<T, K>) {
    if (options.equals) {
      return isEqual(entity[options.key], options.equals);
    }
    if (options.equalsAnyOf) {
      return options.equalsAnyOf.some((inputValue) => isEqual(entity[options.key], inputValue));
    }
    if (options.inArray) {
      const array = entity[options.key] as unknown as typeof options.inArray[];
      return array.some((value) => isEqual(value, options.inArray));
    }
    if (options.inArrayAnyOf) {
      const array = entity[options.key] as unknown as typeof options.inArray[];
      return array.some((value) =>
        options.inArrayAnyOf?.some((valueInput) => isEqual(value, valueInput)),
      );
    }
    return false;
  }

  async findOne<K extends keyof Entity>(option: OptionsEquals<Entity, K>): Promise<Entity | null>;
  async findOne<K extends keyof Entity>(
    option: OptionsEqualsAnyOf<Entity, K>,
  ): Promise<Entity | null>;
  async findOne<K extends keyof Entity>(options: OptionsInArray<Entity, K>): Promise<Entity | null>;
  async findOne<K extends keyof Entity>(
    options: OptionsInArrayAnyOf<Entity, K>,
  ): Promise<Entity | null>;
  async findOne<K extends keyof Entity>(options: Options<Entity, K>): Promise<Entity | null> {
    return this.entities.find((entity) => this.runChecks(entity, options)) ?? null;
  }

  async findMany<K extends keyof Entity>(options: OptionsEquals<Entity, K>): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(option: OptionsEqualsAnyOf<Entity, K>): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(option: OptionsInArray<Entity, K>): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(option: OptionsInArrayAnyOf<Entity, K>): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(): Promise<Entity[]>;
  async findMany<K extends keyof Entity>(options?: Options<Entity, K>): Promise<Entity[]> {
    if (!options) {
      return this.entities;
    }
    return this.entities.filter((entity) => this.runChecks(entity, options));
  }

  async delete(id: string, deleted: Entity): Promise<Entity> {
    this.entities.splice(this.findIndexInDB(id), 1);
    return deleted;
  }

  async change(id: string, entity: Entity): Promise<Entity> {
    this.entities.splice(this.findIndexInDB(id), 1, entity);
    return entity;
  }

  async create(entity: Entity): Promise<Entity> {
    this.entities.push(entity);
    return entity;
  }

  findIndexInDB(id: string): number {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    return idx;
  }
}
