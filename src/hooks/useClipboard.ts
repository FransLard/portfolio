import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook clipboard kecil — tidak ada perubahan UI.
 * Menambah cleanup timer + fallback error handling agar tidak leak.
 */
export function useClipboard(resetDelay: number = 2000) {
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback((text: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        timerRef.current = setTimeout(() => {
          setCopied(false);
        }, resetDelay);
      },
      () => {
        setCopied(false);
      }
    );
  }, [resetDelay]);

  return { copied, copy };
}
