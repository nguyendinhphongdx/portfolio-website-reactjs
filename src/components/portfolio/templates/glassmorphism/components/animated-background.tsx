"use client";

interface AnimatedBackgroundProps {
  primaryColor: string;
}

export function AnimatedBackground({ primaryColor }: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500" />

      {/* Primary blob */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-60 animate-pulse"
        style={{ backgroundColor: primaryColor }}
      />

      {/* Pink blob */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-pink-500 blur-[100px] opacity-40" />

      {/* Cyan blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-400 blur-[80px] opacity-30" />
    </div>
  );
}
