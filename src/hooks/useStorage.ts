import { useEffect, useState } from 'react';

function getStorageValue<T>(key: string, defaultValue: T) {
  const saved = localStorage.getItem(key);

  try {
    return saved ? (JSON.parse(saved) as T) : defaultValue;
  } catch (error) {
    throw error;
  }
}

export function useStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() =>
    getStorageValue<T>(key, defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
