import { Outlet } from 'react-router-dom';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { CustomCursor } from '@/src/components/feedback/CustomCursor';
import { PageTransition } from '@/src/components/layout/PageTransition';

export function RootLayout() {
  return (
    <div className="relative min-h-screen bg-[#0c0d0e] text-[#f4f4f2] overflow-x-clip selection:bg-[#e87a43] selection:text-black">
      {/* Precision Context-Aware Cursor */}
      <CustomCursor />

      {/* Persistent Editorial Header */}
      <Header />

      {/* Main Routed Page Surface with Intentional Transition */}
      <main id="main-content" className="min-h-screen pt-20 focus:outline-none">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Persistent Monolithic Footer */}
      <Footer />
    </div>
  );
}
