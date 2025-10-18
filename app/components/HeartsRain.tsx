"use client";

import { useEffect, useState } from "react";

interface FallingItem {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  type: "heart-red" | "heart-pink" | "music";
  pathType: "zigzag" | "wave" | "spiral";
  horizontalMovement: number;
}

export default function HeartsRain() {
  const [items, setItems] = useState<FallingItem[]>([]);

  useEffect(() => {
    // Generate 20 items (hearts and music notes)
    const itemCount = 20;

    const newItems: FallingItem[] = Array.from(
      { length: itemCount },
      (_, i) => {
        // 60% hearts, 40% music notes
        const rand = Math.random();
        let type: "heart-red" | "heart-pink" | "music";
        if (rand < 0.3) {
          type = "heart-red";
        } else if (rand < 0.6) {
          type = "heart-pink";
        } else {
          type = "music";
        }

        // Different path types for variety
        const pathTypes: ("zigzag" | "wave" | "spiral")[] = [
          "zigzag",
          "wave",
          "spiral",
        ];
        const pathType =
          pathTypes[Math.floor(Math.random() * pathTypes.length)];

        return {
          id: i,
          left: Math.random() * 100,
          animationDuration: 4 + Math.random() * 5, // 4-9 seconds
          animationDelay: Math.random() * 3, // Stagger within 3 seconds
          size: 28 + Math.random() * 28, // 28-56px (20% bigger: was 24-48px)
          type,
          pathType,
          horizontalMovement: 30 + Math.random() * 70, // 30-100px horizontal movement
        };
      }
    );

    setItems(newItems);
  }, []);

  const getItemContent = (type: string) => {
    if (type === "heart-red") {
      return (
        <div
          className="heart-gradient-red"
          style={{
            background:
              "linear-gradient(135deg, #ff0844 0%, #ff6b9d 50%, #ff0844 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 8px rgba(255, 8, 68, 0.5))",
          }}
        >
          ❤️
        </div>
      );
    } else if (type === "heart-pink") {
      return (
        <div
          className="heart-gradient-pink"
          style={{
            background:
              "linear-gradient(135deg, #ff69b4 0%, #ffb6d9 50%, #ff1493 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 8px rgba(255, 105, 180, 0.5))",
          }}
        >
          ❤️
        </div>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{
            width: "1em",
            height: "1em",
            fill: "#000000",
            filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))",
          }}
        >
          <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
        </svg>
      );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute fall-${item.pathType}`}
          style={{
            left: `${item.left}%`,
            top: "-10%", // Start above viewport
            animationDuration: `${item.animationDuration}s`,
            animationDelay: `${item.animationDelay}s`,
            fontSize: `${item.size}px`,
            ["--horizontal-movement" as string]: `${item.horizontalMovement}px`,
          }}
        >
          {getItemContent(item.type)}
        </div>
      ))}

      <style jsx>{`
        @keyframes fall-zigzag {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) translateX(var(--horizontal-movement))
              rotate(90deg);
          }
          50% {
            transform: translateY(50vh) translateX(0) rotate(180deg);
          }
          75% {
            transform: translateY(75vh)
              translateX(calc(var(--horizontal-movement) * -1)) rotate(270deg);
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fall-wave {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          20% {
            transform: translateY(20vh)
              translateX(calc(var(--horizontal-movement) * 0.5)) rotate(72deg)
              scale(1.1);
          }
          40% {
            transform: translateY(40vh) translateX(var(--horizontal-movement))
              rotate(144deg) scale(0.9);
          }
          60% {
            transform: translateY(60vh)
              translateX(calc(var(--horizontal-movement) * 0.5)) rotate(216deg)
              scale(1.05);
          }
          80% {
            transform: translateY(80vh) translateX(0) rotate(288deg) scale(0.95);
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh)
              translateX(calc(var(--horizontal-movement) * -0.3)) rotate(360deg)
              scale(1);
            opacity: 0;
          }
        }

        @keyframes fall-spiral {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          15% {
            transform: translateY(15vh)
              translateX(calc(var(--horizontal-movement) * 0.3)) rotate(54deg)
              scale(1.2);
          }
          30% {
            transform: translateY(30vh)
              translateX(calc(var(--horizontal-movement) * 0.8)) rotate(108deg)
              scale(0.9);
          }
          45% {
            transform: translateY(45vh) translateX(var(--horizontal-movement))
              rotate(180deg) scale(1.1);
          }
          60% {
            transform: translateY(60vh)
              translateX(calc(var(--horizontal-movement) * 0.6)) rotate(252deg)
              scale(0.85);
          }
          75% {
            transform: translateY(75vh)
              translateX(calc(var(--horizontal-movement) * 0.2)) rotate(306deg)
              scale(1.05);
          }
          90% {
            transform: translateY(90vh)
              translateX(calc(var(--horizontal-movement) * -0.2)) rotate(342deg)
              scale(0.95);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(360deg) scale(1);
            opacity: 0;
          }
        }

        .fall-zigzag {
          animation: fall-zigzag linear infinite;
        }

        .fall-wave {
          animation: fall-wave ease-in-out infinite;
        }

        .fall-spiral {
          animation: fall-spiral ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
