import { useEffect, useState } from "react";
import { getRandomEncouragement } from "@/data/content";

interface EncouragementPopupProps {
  show: boolean;
  onComplete?: () => void;
}

export const EncouragementPopup = ({ show, onComplete }: EncouragementPopupProps) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setMessage(getRandomEncouragement());
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      <div className="bg-success text-success-foreground px-8 py-4 rounded-3xl shadow-glow-success text-3xl font-black animate-bounce-in">
        {message}
      </div>
    </div>
  );
};
