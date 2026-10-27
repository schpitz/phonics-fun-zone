import { useState, useEffect } from "react";

interface CelebrationFeedbackProps {
  show: boolean;
  onComplete?: () => void;
}

const celebrationMessages = [
  { text: "Amazing!", emoji: "🌟" },
  { text: "Super!", emoji: "⭐" },
  { text: "Wow!", emoji: "🎉" },
  { text: "Great job!", emoji: "🚀" },
  { text: "Fantastic!", emoji: "💫" },
  { text: "You rock!", emoji: "🔥" },
  { text: "Perfect!", emoji: "✨" },
  { text: "Awesome!", emoji: "🎊" },
  { text: "Brilliant!", emoji: "💎" },
  { text: "Yes!", emoji: "🏆" },
];

export const CelebrationFeedback = ({ show, onComplete }: CelebrationFeedbackProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [message, setMessage] = useState(celebrationMessages[0]);

  useEffect(() => {
    if (show) {
      // Pick a random celebration message
      const randomMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
      setMessage(randomMessage);
      setIsVisible(true);
      setIsFading(false);

      // Start fading after 1.5 seconds
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 1500);

      // Hide completely after 2 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    } else {
      // When show becomes false, hide immediately
      setIsFading(true);
      const t = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed inset-0 pointer-events-none z-50 flex items-center justify-center
        transition-opacity duration-500
        ${isFading ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* Confetti burst from the center */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        {[...Array(18)].map((_, i) => {
          const angle = (i / 18) * Math.PI * 2;
          const dist = 140 + (i % 3) * 50;
          return (
            <span
              key={i}
              className="absolute text-3xl sm:text-4xl animate-confetti-burst"
              style={{
                ["--dx" as string]: `${Math.cos(angle) * dist}px`,
                ["--dy" as string]: `${Math.sin(angle) * dist}px`,
                animationDelay: `${(i % 4) * 0.04}s`,
              }}
            >
              {['⭐', '🌟', '✨', '💫', '🎉', '🎊'][i % 6]}
            </span>
          );
        })}
      </div>

      {/* Main celebration message */}
      <div 
        className={`
          bg-gradient-to-br from-accent via-primary to-accent
          text-white px-8 py-6 sm:px-12 sm:py-8 rounded-3xl
          shadow-2xl transform
          animate-[scale-in_0.3s_ease-out]
          flex flex-col items-center gap-2
        `}
      >
        <span className="text-6xl sm:text-7xl animate-bounce">{message.emoji}</span>
        <span className="text-2xl sm:text-3xl font-black tracking-wide">
          {message.text}
        </span>
      </div>
    </div>
  );
};
