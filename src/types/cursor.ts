export type CursorVariant = 'default' | 'pointer' | 'view' | 'drag' | 'magnetic';

export interface CursorState {
  variant: CursorVariant;
  label?: string;
  isHovered: boolean;
}

export interface CursorContextValue {
  cursorState: CursorState;
  setCursorVariant: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
}
