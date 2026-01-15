import Link from "next/link";
import { Sparkles, ArrowLeft, UserX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-subtle bg-noise flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-8">
          <UserX className="w-10 h-10 text-muted-foreground" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Portfolio Not Found</h1>
        <p className="text-muted-foreground mb-8">
          This portfolio doesn't exist or hasn't been published yet.
          The user may have changed their username or made their portfolio private.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all shadow-elegant"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold border-2 rounded-xl hover:bg-muted/50 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Create Your Own
          </Link>
        </div>
      </div>
    </div>
  );
}
