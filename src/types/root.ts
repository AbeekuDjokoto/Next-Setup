export type Func = (...args: any[]) => any;

export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

export type ToastNotificationType = 'info' | 'success' | 'error';

export type StringWithAutoComplete<T> = T | (string & {});

export type BackendResponseType<T> = {
  data: T;
  message: string;
  status: number;
};
