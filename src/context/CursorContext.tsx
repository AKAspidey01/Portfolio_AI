import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { CursorVariant, CursorState, CursorContextValue } from '@/src/types/cursor';

const defaultState: CursorState = {
  variant: 'default',
  label: undefined,
  isHovered: false,
};

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>(defaultState);

  const setCursorVariant = useCallback((variant: CursorVariant, label?: string) => {
    setCursorState({
      variant,
      label,
      isHovered: variant !== 'default',
    });
  }, []);

  const resetCursor = useCallback(() => {
    setCursorState(defaultState);
  }, []);

  const value = useMemo(
    () => ({
      cursorState,
      setCursorVariant,
      resetCursor,
    }),
    [cursorState, setCursorVariant, resetCursor]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor(): CursorContextValue {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
