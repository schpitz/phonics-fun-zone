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

      // Start fading after 2 seconds
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 2000);

      // Hide completely after 2.5 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
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
      {/* Confetti-like particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + Math.random() * 30}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          >
            <span className="text-3xl sm:text-4xl">
              {['⭐', '🌟', '✨', '💫', '🎉', '🎊'][i % 6]}
            </span>
          </div>
        ))}
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
