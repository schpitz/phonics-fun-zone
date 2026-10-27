import { ArrowLeft } from "lucide-react";

export const BackToGamesButton = ({ onBack }: { onBack: () => void }) => (
  <button
    onClick={onBack}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 active:scale-95 transition-all text-sm font-bold text-foreground"
    aria-label="Back to games menu"
  >
    <ArrowLeft className="h-5 w-5" />
    <span>Back</span>
  </button>
);
