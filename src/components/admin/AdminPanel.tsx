import { useState } from "react";
import { GameButton } from "@/components/ui/game-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, MessageSquare, LogOut, RotateCcw } from "lucide-react";
import { VocabularyManager } from "./VocabularyManager";
import { SentencesManager } from "./SentencesManager";
import { vocabularyManager } from "@/data/vocabulary";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface AdminPanelProps {
  onLogout: () => void;
  onBack: () => void;
}

export const AdminPanel = ({ onLogout, onBack }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("vocabulary");

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    onLogout();
  };

  const handleResetToDefaults = () => {
    vocabularyManager.resetToDefaults();
    toast.success("Reset to defaults! Refresh the page to see changes.");
    // Force a refresh of the component
    setActiveTab("sentences");
    setTimeout(() => setActiveTab("vocabulary"), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted pb-4">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b-2 border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <GameButton variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </GameButton>
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Vocabulary Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <GameButton variant="ghost" size="sm" className="text-amber-600">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </GameButton>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset to Defaults?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all your custom words and sentences and restore the original vocabulary. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetToDefaults} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Reset All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <GameButton variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </GameButton>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="vocabulary" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Words
            </TabsTrigger>
            <TabsTrigger value="sentences" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Sentences
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vocabulary" className="mt-0">
            <VocabularyManager />
          </TabsContent>
          
          <TabsContent value="sentences" className="mt-0">
            <SentencesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
