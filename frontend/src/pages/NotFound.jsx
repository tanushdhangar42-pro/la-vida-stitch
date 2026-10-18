import { Link } from "react-router-dom";
import { usePageTitle } from "@/lib/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found — LA VIDA STITCH");
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-7xl">404</h1>
        <h2 className="mt-4 text-xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="mt-8 inline-flex bg-foreground px-8 py-3 text-[11px] tracking-[0.22em] text-background">
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
