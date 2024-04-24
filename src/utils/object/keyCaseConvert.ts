import { strToCamelCase, strToSnakeCase } from '@utils/caseConvert';

/**
 * キャメルケース変換
 * スネークケースとケバブケースをキャメルケースに変換
 * */
export const toCamelCase = <T extends Record<string, unknown>>(
  obj: T
): CamelCase<T> => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase) as unknown as CamelCase<T>;
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        strToCamelCase(key),
        toCamelCase(value as Record<string, unknown>),
      ])
    ) as unknown as CamelCase<T>;
  }
  return obj as CamelCase<T>;
};

type CamelCase<T> = T extends Record<string, unknown>
  ? { [K in keyof T]: CamelCase<T[K]> }
  : T extends (infer U)[]
  ? U extends Record<string, unknown>
    ? CamelCase<U>[]
    : T
  : T;

/**
 * スネークケースへの変換
 * キャメルケースとケバブケースをスネークケースに変換
 * */
export const toSnakeCase = <T extends Record<string, unknown>>(
  obj: T
): SnakeCase<T> => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase) as unknown as SnakeCase<T>;
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        strToSnakeCase(key),
        toSnakeCase(value as Record<string, unknown>),
      ])
    ) as unknown as SnakeCase<T>;
  }
  return obj as SnakeCase<T>;
};

type SnakeCase<T> = T extends Record<string, unknown>
  ? { [K in keyof T]: SnakeCase<T[K]> }
  : T extends (infer U)[]
  ? U extends Record<string, unknown>
    ? SnakeCase<U>[]
    : T
  : T;
