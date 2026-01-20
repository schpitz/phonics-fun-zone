import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface StarBurstProps {
  show: boolean;
  onComplete?: () => void;
}

export const StarBurst = ({ show, onComplete }: StarBurstProps) => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    if (show) {
      const newStars = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.cos((i * Math.PI * 2) / 8) * 60,
        y: Math.sin((i * Math.PI * 2) / 8) * 60,
        delay: i * 0.05,
      }));
      setStars(newStars);

      const timer = setTimeout(() => {
        setStars([]);
        onComplete?.();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show || stars.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {stars.map((star) => (
        <Star
          key={star.id}
          className="absolute h-6 w-6 fill-success text-success animate-bounce-in"
          style={{
            transform: `translate(${star.x}px, ${star.y}px)`,
            animationDelay: `${star.delay}s`,
            opacity: 0,
            animation: `bounce-in 0.5s ease-out ${star.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};
