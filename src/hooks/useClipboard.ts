import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook clipboard kecil — tidak ada perubahan UI.
 * Menambah cleanup timer + fallback error handling agar tidak leak.
 */
// Default jeda reset status clipboard — nilai sama, diekstrak tanpa ubah perilaku.
const DEFAULT_CLIPBOARD_RESET_DELAY_MS = 2000;

export function useClipboard(resetDelay: number = DEFAULT_CLIPBOARD_RESET_DELAY_MS) {
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
