import { AxiosResponse } from "axios";

export type IdKey<T> = keyof T;

export type Primitive = string | number | boolean;

export type PrimitiveKeys<T> = {
  [K in keyof T]: T[K] extends Primitive ? K : never;
}[keyof T];

export interface ComponentProps<T extends object> {
  title: string;
  fetchFn: (token?: string) => Promise<AxiosResponse<T[]>>;
  idKey: IdKey<T>;
  columns: Array<PrimitiveKeys<T>>;
  updateFn?: (id: number | string, data: Partial<Omit<T, IdKey<T>>>) => Promise<void>;
  deleteFn?: (id: number | string) => Promise<void>;
}