"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-white">
      <div className="relative flex items-center justify-center">
        {/* Animated heart */}
        <svg
            className="w-24 h-24 md:w-32 md:h-32 heart-loader"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            style={{
                background: "none",
                shapeRendering: "geometricPrecision",
                overflow: "visible",
            }}
            >
            <path
                d="M50,90 C50,90 10,65 10,40 C10,25 20,15 30,15 C40,15 45,22 50,30 C55,22 60,15 70,15 C80,15 90,25 90,40 C90,65 50,90 50,90 Z"
                className="heart-fill"
            />
        </svg>

        {/* Pulsing circles around heart */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pulse-ring"></div>
          <div className="pulse-ring-delay"></div>
        </div>
      </div>

      <style jsx>{`
        .heart-loader {
          animation: heartbeat 1.2s ease-in-out infinite;
        }

        .heart-fill {
          fill: #ec4899;
          filter: drop-shadow(0 4px 20px rgba(236, 72, 153, 0.4));
          animation: heartFill 1.2s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          10%,
          30% {
            transform: scale(0.9);
          }
          20%,
          40%,
          50%,
          60%,
          70% {
            transform: scale(1.1);
          }
          80% {
            transform: scale(1.05);
          }
          90% {
            transform: scale(1);
          }
        }

        @keyframes heartFill {
          0%,
          100% {
            fill: #ec4899;
          }
          50% {
            fill: #f472b6;
          }
        }

        .pulse-ring,
        .pulse-ring-delay {
          position: absolute;
          width: 120px;
          height: 120px;
          border: 3px solid #ec4899;
          border-radius: 50%;
          opacity: 0;
          animation: pulse 2s ease-out infinite;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .pulse-ring-delay {
          animation-delay: 1s;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        @media (min-width: 768px) {
          .pulse-ring,
          .pulse-ring-delay {
            width: 160px;
            height: 160px;
          }
        }
      `}</style>
    </div>
  );
}
