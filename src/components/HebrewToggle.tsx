export const HebrewToggle = ({ showHebrew, onToggle }: { showHebrew: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-bold"
  >
    <span className="text-lg">🇮🇱</span>
    <span className={showHebrew ? "text-foreground" : "text-muted-foreground"}>
      {showHebrew ? "עברית" : "Hebrew"}
    </span>
  </button>
);
