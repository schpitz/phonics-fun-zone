interface LevelSelectorProps {
  value: number;
  onChange: (level: number) => void;
  levels: { level: number; label: string; icon: string }[];
}

export const LevelSelector = ({ value, onChange, levels }: LevelSelectorProps) => (
  <div className="mt-4 flex flex-col items-center gap-2">
    <p className="text-sm font-bold text-muted-foreground">Choose Difficulty</p>
    <div className="flex justify-center gap-1.5 bg-muted/50 p-2 rounded-2xl w-full max-w-xs">
      {levels.map((d) => (
        <button
          key={d.level}
          onClick={() => onChange(d.level)}
          className={`flex flex-col items-center flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            value === d.level
              ? "bg-primary text-primary-foreground shadow-button scale-105"
              : "bg-card text-muted-foreground hover:bg-card/80"
          }`}
        >
          <span className="text-lg">{d.icon}</span>
          <span>{d.label}</span>
        </button>
      ))}
    </div>
  </div>
);

export const THREE_LEVELS = [
  { level: 1, label: "Easy", icon: "🌟" },
  { level: 2, label: "Medium", icon: "⭐" },
  { level: 3, label: "Hard", icon: "🔥" },
];
