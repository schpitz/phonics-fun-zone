import { Star } from "lucide-react";

interface ProgressBarProps {
  stars: number;
  showHebrewToggle?: boolean;
  showHebrew?: boolean;
  onToggleHebrew?: () => void;
}

export const ProgressBar = ({
  stars,
  showHebrewToggle = false,
  showHebrew = true,
  onToggleHebrew,
}: ProgressBarProps) => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 bg-card rounded-2xl shadow-soft">
      <div className="flex items-center gap-2">
        <Star className="h-7 w-7 fill-success text-success" />
        <span className="text-2xl font-black text-foreground">{stars}</span>
      </div>

      {showHebrewToggle && (
        <button
          onClick={onToggleHebrew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-bold"
        >
          <span className="text-lg">🇮🇱</span>
          <span className={showHebrew ? "text-foreground" : "text-muted-foreground"}>
            {showHebrew ? "עברית" : "Hebrew"}
          </span>
        </button>
      )}
    </div>
  );
};
