import { useEffect, useState } from 'react';

export function useLocalStorageState<Value>(storageKey: string, createInitialValue: () => Value) {
  const [value, setValue] = useState<Value>(() => {
    try {
      const storedValue = window.localStorage.getItem(storageKey);
      if (storedValue !== null) {
        return JSON.parse(storedValue) as Value;
      }
    } catch {
      // Storage unavailable or corrupt: fall back to the initial value.
    }
    return createInitialValue();
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // Storage full or blocked: keep working in memory.
    }
  }, [storageKey, value]);

  return [value, setValue] as const;
}
