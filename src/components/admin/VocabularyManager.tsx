import { useState, useMemo } from "react";
import { vocabularyManager, UnifiedWord } from "@/data/vocabulary";
import { GameButton } from "@/components/ui/game-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit2, Trash2, Search, Filter } from "lucide-react";
import { toast } from "sonner";

export const VocabularyManager = () => {
  const [words, setWords] = useState<UnifiedWord[]>(() => vocabularyManager.getAllWords());
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<UnifiedWord | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    english: "",
    hebrew: "",
    category: "",
    emoji: "",
    difficulty: 3 as 1 | 2 | 3 | 4 | 5,
    vowelType: "short" as "short" | "long" | "none",
    enabledForABC: true,
    enabledForWords: true,
    enabledForMatching: true,
    enabledForSpelling: true,
  });

  const categories = useMemo(() => vocabularyManager.getCategories(), [words]);

  const filteredWords = useMemo(() => {
    return words.filter(word => {
      const matchesSearch = 
        word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.hebrew.includes(searchTerm);
      const matchesCategory = categoryFilter === "all" || word.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === "all" || word.difficulty === parseInt(difficultyFilter);
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [words, searchTerm, categoryFilter, difficultyFilter]);

  const resetForm = () => {
    setFormData({
      english: "",
      hebrew: "",
      category: "",
      emoji: "",
      difficulty: 3,
      vowelType: "short",
      enabledForABC: true,
      enabledForWords: true,
      enabledForMatching: true,
      enabledForSpelling: true,
    });
    setEditingWord(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (word: UnifiedWord) => {
    setEditingWord(word);
    setFormData({
      english: word.english,
      hebrew: word.hebrew,
      category: word.category,
      emoji: word.emoji,
      difficulty: word.difficulty,
      vowelType: word.vowelType,
      enabledForABC: word.enabledForABC,
      enabledForWords: word.enabledForWords,
      enabledForMatching: word.enabledForMatching,
      enabledForSpelling: word.enabledForSpelling,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.english.trim() || !formData.hebrew.trim()) {
      toast.error("English and Hebrew are required");
      return;
    }

    if (editingWord) {
      vocabularyManager.updateWord(editingWord.id, formData);
      toast.success("Word updated successfully");
    } else {
      vocabularyManager.addWord(formData);
      toast.success("Word added successfully");
    }

    setWords(vocabularyManager.getAllWords());
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    vocabularyManager.deleteWord(id);
    setWords(vocabularyManager.getAllWords());
    toast.success("Word deleted successfully");
  };

  const getDifficultyLabel = (difficulty: number) => {
    const labels: Record<number, string> = {
      1: "Easy",
      2: "Medium", 
      3: "Hard",
      4: "Expert",
      5: "Master",
    };
    return labels[difficulty] || "Unknown";
  };

  const getDifficultyColor = (difficulty: number) => {
    const colors: Record<number, string> = {
      1: "bg-green-100 text-green-800",
      2: "bg-blue-100 text-blue-800",
      3: "bg-yellow-100 text-yellow-800",
      4: "bg-orange-100 text-orange-800",
      5: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "";
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card rounded-lg border p-3 text-center">
          <div className="text-2xl font-bold text-primary">{words.length}</div>
          <div className="text-xs text-muted-foreground">Total Words</div>
        </div>
        <div className="bg-card rounded-lg border p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{categories.length}</div>
          <div className="text-xs text-muted-foreground">Categories</div>
        </div>
        <div className="bg-card rounded-lg border p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {words.filter(w => w.enabledForSpelling).length}
          </div>
          <div className="text-xs text-muted-foreground">For Spelling</div>
        </div>
        <div className="bg-card rounded-lg border p-3 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {words.filter(w => w.enabledForMatching).length}
          </div>
          <div className="text-xs text-muted-foreground">For Matching</div>
        </div>
      </div>

      {/* Filters and Add Button */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full md:w-32">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="1">Easy</SelectItem>
            <SelectItem value="2">Medium</SelectItem>
            <SelectItem value="3">Hard</SelectItem>
            <SelectItem value="4">Expert</SelectItem>
            <SelectItem value="5">Master</SelectItem>
          </SelectContent>
        </Select>
        <GameButton variant="primary" onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-1" />
          Add Word
        </GameButton>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Emoji</TableHead>
                <TableHead>English</TableHead>
                <TableHead>Hebrew</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="text-center">Screens</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWords.slice(0, 100).map((word) => (
                <TableRow key={word.id}>
                  <TableCell className="text-xl">{word.emoji}</TableCell>
                  <TableCell className="font-medium">{word.english}</TableCell>
                  <TableCell className="text-right" dir="rtl">{word.hebrew}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{word.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(word.difficulty)}>
                      {getDifficultyLabel(word.difficulty)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1 text-xs">
                      {word.enabledForABC && <Badge variant="outline" className="px-1">ABC</Badge>}
                      {word.enabledForWords && <Badge variant="outline" className="px-1">Words</Badge>}
                      {word.enabledForMatching && <Badge variant="outline" className="px-1">Match</Badge>}
                      {word.enabledForSpelling && <Badge variant="outline" className="px-1">Spell</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <GameButton
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(word)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </GameButton>
                      <GameButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(word.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </GameButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredWords.length > 100 && (
          <div className="p-3 text-center text-sm text-muted-foreground border-t">
            Showing 100 of {filteredWords.length} words. Use filters to narrow down.
          </div>
        )}
        {filteredWords.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No words found matching your filters.
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingWord ? "Edit Word" : "Add New Word"}</DialogTitle>
            <DialogDescription>
              {editingWord ? "Update the word details below." : "Fill in the word details below."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="english">English *</Label>
                <Input
                  id="english"
                  value={formData.english}
                  onChange={(e) => setFormData({ ...formData, english: e.target.value })}
                  placeholder="e.g. Cat"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hebrew">Hebrew *</Label>
                <Input
                  id="hebrew"
                  value={formData.hebrew}
                  onChange={(e) => setFormData({ ...formData, hebrew: e.target.value })}
                  placeholder="e.g. חתול"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Animals"
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map(cat => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emoji">Emoji</Label>
                <Input
                  id="emoji"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  placeholder="e.g. 🐱"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty.toString()}
                  onValueChange={(v) => setFormData({ ...formData, difficulty: parseInt(v) as 1 | 2 | 3 | 4 | 5 })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Easy (2-3 letters)</SelectItem>
                    <SelectItem value="2">2 - Medium (4 letters)</SelectItem>
                    <SelectItem value="3">3 - Hard (4-5 letters)</SelectItem>
                    <SelectItem value="4">4 - Expert (5-6 letters)</SelectItem>
                    <SelectItem value="5">5 - Master (7+ letters)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vowelType">Vowel Type</Label>
                <Select
                  value={formData.vowelType}
                  onValueChange={(v) => setFormData({ ...formData, vowelType: v as "short" | "long" | "none" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label>Enable for Screens:</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="abc" className="text-sm">ABC Screen</Label>
                  <Switch
                    id="abc"
                    checked={formData.enabledForABC}
                    onCheckedChange={(v) => setFormData({ ...formData, enabledForABC: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="words" className="text-sm">Words Screen</Label>
                  <Switch
                    id="words"
                    checked={formData.enabledForWords}
                    onCheckedChange={(v) => setFormData({ ...formData, enabledForWords: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="matching" className="text-sm">Match Screen</Label>
                  <Switch
                    id="matching"
                    checked={formData.enabledForMatching}
                    onCheckedChange={(v) => setFormData({ ...formData, enabledForMatching: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="spelling" className="text-sm">Spell Screen</Label>
                  <Switch
                    id="spelling"
                    checked={formData.enabledForSpelling}
                    onCheckedChange={(v) => setFormData({ ...formData, enabledForSpelling: v })}
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <GameButton variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </GameButton>
            <GameButton variant="primary" onClick={handleSave}>
              {editingWord ? "Update" : "Add"} Word
            </GameButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
