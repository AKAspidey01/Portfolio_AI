import { RouterProvider } from 'react-router-dom';
import { router } from '@/src/app/routes';
import { SmoothScrollProvider } from '@/src/context/SmoothScrollContext';
import { CursorProvider } from '@/src/context/CursorContext';

/**
 * Root Application Entry Shell
 * Keeps App.tsx strictly minimal (~15 lines) by delegating layout,
 * routing, and page views to dedicated architectural modules.
 */
export default function App() {
  return (
    <SmoothScrollProvider>
      <CursorProvider>
        <RouterProvider router={router} />
      </CursorProvider>
    </SmoothScrollProvider>
  );
}
