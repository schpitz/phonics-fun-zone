import { useState, useMemo } from "react";
import { vocabularyManager, SentenceData } from "@/data/vocabulary";
import { GameButton } from "@/components/ui/game-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

export const SentencesManager = () => {
  const [sentences, setSentences] = useState<SentenceData[]>(() => 
    vocabularyManager.getAllSentences()
  );
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSentence, setEditingSentence] = useState<SentenceData | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    english: "",
    hebrew: "",
    words: "",
    enabledForBuilder: true,
  });

  const filteredSentences = useMemo(() => {
    return sentences.filter(sentence => {
      return (
        sentence.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sentence.hebrew.includes(searchTerm)
      );
    });
  }, [sentences, searchTerm]);

  const resetForm = () => {
    setFormData({
      english: "",
      hebrew: "",
      words: "",
      enabledForBuilder: true,
    });
    setEditingSentence(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (sentence: SentenceData) => {
    setEditingSentence(sentence);
    setFormData({
      english: sentence.english,
      hebrew: sentence.hebrew,
      words: sentence.words.join(", "),
      enabledForBuilder: sentence.enabledForBuilder !== false,
    });
    setIsDialogOpen(true);
  };

  // Auto-generate words array from English sentence
  const autoGenerateWords = () => {
    if (formData.english) {
      const words = formData.english.split(/\s+/).filter(w => w.length > 0);
      setFormData({ ...formData, words: words.join(", ") });
    }
  };

  const handleSave = () => {
    if (!formData.english.trim() || !formData.hebrew.trim()) {
      toast.error("English and Hebrew sentences are required");
      return;
    }

    const wordsArray = formData.words
      .split(",")
      .map(w => w.trim())
      .filter(w => w.length > 0);

    if (wordsArray.length === 0) {
      toast.error("Please add the sentence words");
      return;
    }

    const sentenceData = {
      english: formData.english.trim(),
      hebrew: formData.hebrew.trim(),
      words: wordsArray,
      enabledForBuilder: formData.enabledForBuilder,
    };

    if (editingSentence) {
      vocabularyManager.updateSentence(editingSentence.id, sentenceData);
      toast.success("Sentence updated successfully");
    } else {
      vocabularyManager.addSentence(sentenceData);
      toast.success("Sentence added successfully");
    }

    setSentences(vocabularyManager.getAllSentences());
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    vocabularyManager.deleteSentence(id);
    setSentences(vocabularyManager.getAllSentences());
    toast.success("Sentence deleted successfully");
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="bg-card rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">{sentences.length}</div>
            <div className="text-sm text-muted-foreground">Total Sentences</div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p>Sentences are used in the "Read" section.</p>
            <p>Each sentence should have individual words for highlighting.</p>
          </div>
        </div>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search sentences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <GameButton variant="primary" onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-1" />
          Add Sentence
        </GameButton>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>English</TableHead>
                <TableHead>Hebrew</TableHead>
                <TableHead>Words</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSentences.slice(0, 50).map((sentence) => (
                <TableRow key={sentence.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {sentence.english}
                  </TableCell>
                  <TableCell className="text-right max-w-[200px] truncate" dir="rtl">
                    {sentence.hebrew}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate">
                    {sentence.words.join(" | ")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <GameButton
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(sentence)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </GameButton>
                      <GameButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(sentence.id)}
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
        {filteredSentences.length > 50 && (
          <div className="p-3 text-center text-sm text-muted-foreground border-t">
            Showing 50 of {filteredSentences.length} sentences. Use search to find specific ones.
          </div>
        )}
        {filteredSentences.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No sentences found matching your search.
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingSentence ? "Edit Sentence" : "Add New Sentence"}</DialogTitle>
            <DialogDescription>
              {editingSentence 
                ? "Update the sentence details below." 
                : "Fill in the sentence details. Words will be used for read-along highlighting."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="english">English Sentence *</Label>
              <Textarea
                id="english"
                value={formData.english}
                onChange={(e) => setFormData({ ...formData, english: e.target.value })}
                placeholder="e.g. The cat is happy"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hebrew">Hebrew Translation *</Label>
              <Textarea
                id="hebrew"
                value={formData.hebrew}
                onChange={(e) => setFormData({ ...formData, hebrew: e.target.value })}
                placeholder="e.g. החתול שמח"
                rows={2}
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="words">Words (comma-separated) *</Label>
                <GameButton 
                  variant="ghost" 
                  size="sm" 
                  onClick={autoGenerateWords}
                  className="text-xs h-6"
                >
                  Auto-generate
                </GameButton>
              </div>
              <Input
                id="words"
                value={formData.words}
                onChange={(e) => setFormData({ ...formData, words: e.target.value })}
                placeholder="e.g. The, cat, is, happy"
              />
              <p className="text-xs text-muted-foreground">
                Each word will be highlighted during read-along
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="builder" className="text-sm">Use in Sentence Builder</Label>
              <Switch
                id="builder"
                checked={formData.enabledForBuilder}
                onCheckedChange={(v) => setFormData({ ...formData, enabledForBuilder: v })}
              />
            </div>
          </div>

          <DialogFooter>
            <GameButton variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </GameButton>
            <GameButton variant="primary" onClick={handleSave}>
              {editingSentence ? "Update" : "Add"} Sentence
            </GameButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
