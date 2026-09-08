import { Link } from 'react-router-dom';
import { MagneticButton } from '@/src/components/common/MagneticButton';
import { TextReveal } from '@/src/components/common/TextReveal';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs text-[#e87a43] uppercase tracking-wider mb-3">
        Error 404 / Void
      </span>
      <TextReveal as="h1" className="text-display-sub text-[#f4f4f2] font-light">
        Vector Coordinate Not Found
      </TextReveal>
      <p className="mt-4 font-sans text-sm text-[#8e9298] max-w-md">
        The coordinate stream you requested does not exist or has been shifted in spatial memory.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <MagneticButton to="/" variant="primary">Return Home</MagneticButton>
        <Link
          to="/work"
          className="font-mono text-xs uppercase tracking-wider text-[#8e9298] hover:text-[#f4f4f2] transition-colors"
        >
          Browse Archive
        </Link>
      </div>
    </div>
  );
}
