"use client";

import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

// Pre-define meteor positions to avoid hydration mismatches
const METEOR_POSITIONS = [
  { top: "-5%", left: "20%", delay: "0.5s", duration: "7s" },
  { top: "-15%", left: "35%", delay: "1.5s", duration: "6.5s" },
  { top: "-10%", left: "50%", delay: "2.5s", duration: "8s" },
  { top: "-7%", left: "65%", delay: "0s", duration: "6s" },
  { top: "-12%", left: "80%", delay: "1s", duration: "7.5s" },
  { top: "-3%", left: "95%", delay: "2s", duration: "8.5s" },
  { top: "-18%", left: "10%", delay: "3s", duration: "7s" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Add client-side tracking with useEffect
  const [mounted, setMounted] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
            style={mounted ? {
              "--x": `${cursorPosition.x}px`,
              "--y": `${cursorPosition.y}px`,
            } as React.CSSProperties : undefined}
          >
            {/* Animated Gradient Background */}
            <div className="fixed inset-0 bg-grid-small-white/[0.2] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>
            
            {/* Spotlight effect */}
            <div className="spotlight fixed inset-0 pointer-events-none z-0"></div>

            {/* Animated Particles/Meteors with static positions */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              {METEOR_POSITIONS.map((position, i) => (
                <div
                  key={i}
                  className="absolute top-0 -z-10 h-[300px] w-[2px] rotate-[215deg] animate-meteor-effect rounded-full bg-primary/50"
                  style={{
                    top: position.top,
                    left: position.left,
                    animationDelay: position.delay,
                    animationDuration: position.duration,
                  }}
                ></div>
              ))}
            </div>
            <main className="relative z-10">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
