import { isFunction } from '@/utils/functions';

export function createArray<T>(length: number, value: T | ((i: number) => T)): T[] {
  return Array.from({ length }, (_, i) => (isFunction(value) ? value(i) : value));
}

export function shuffleArray<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}

export function getArraySlice<T>(arr: T[], start: number, cnt: number): T[] {
  return [...arr, ...arr].slice(start, start + cnt);
}

export function isArray<S>(value: unknown): value is S[] {
  return Array.isArray(value);
}
