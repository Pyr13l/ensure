export type RemoveOptionalNullUndefined<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>;
};

export const isDefined = <T>(value: T): value is NonNullable<T> =>
  value !== undefined && value !== null;

/**
 * You will need to use this constraint if you plan on feeding ensure() with a generic
 * @example
 * const example = <T extends { test: string }>(arg: NoArrayOrSet<T>) => {
 *    const { test } = ensure(arg, "test");
 *    ...
 * }
 */
export type NoArrayOrSet<T> = T extends Array<unknown> | Set<unknown>
  ? never
  : T;

/**
 * Will create a copy of a supplied object and either
 *
 * - check all members for null / undefined
 *
 * - check the members you supplied keys for
 *
 * and adjust the resulting type accordingly.
 *
 * THIS WILL THROW IF ANY CHECKED MEMBER IS NULL / UNDEFINED
 *
 * @example
 * interface SomeDto {
 *    id: string | undefined;
 *    test?: string;
 * };
 *
 * const example = async () => {
 *    const someDto: SomeDto = await fetch(...).then(...);
 *    const {id, test} = ensure(someDto, "id", "test");
 *    // the values of id and test are now both just string
 *    // no further checks needed
 *    // be aware though - this is only a shallow check
 *    ...
 * }
 *
 * @param value The parent object you want to check / adjust the type for
 * @param args The keys to the members you want to check for null / undefined
 * @returns A copy of the supplied value, type adjusted dependent on what you supplied in the "args" Array
 *
 */
export const ensure = <T, K extends keyof T & string>(
  value: NoArrayOrSet<T> | undefined,
  ...args: K[]
) => {
  if (!isDefined(value)) {
    throw new Error("Supplied value was not defined!");
  }

  let keys = args;
  if (!keys.length) {
    keys = Object.keys(value) as K[];
  }

  const result = { ...value };

  for (const key of keys) {
    const current = value[key];
    if (isDefined(current)) {
      result[key] = current;
    } else {
      throw new Error(`Member was not defined: ${key}`);
    }
  }

  return result as RemoveOptionalNullUndefined<T, K>;
};
