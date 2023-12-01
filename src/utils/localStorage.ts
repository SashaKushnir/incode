export interface LocalStoreState {

}

export class LocalStore {
  static set<T extends keyof LocalStoreState>(
    key: T,
    value: LocalStoreState[T],
  ) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static get<T extends keyof LocalStoreState>(
    key: T,
  ): LocalStoreState[T] | undefined {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key);

      if (typeof value === 'string') {
        return JSON.parse(value);
      }
    }

    return undefined;
  }
}

