'use client';

import { useEffect, useState } from 'react';

export function useClientTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const current = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setTime(current);
  }, []);

  return time;
}
