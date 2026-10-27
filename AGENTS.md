# Agent rules
- Screen ids live in src/data/screens.ts; games are grouped under one 'Games' bottom tab so the bar stays at 5 large touch targets for kids.
- All TTS source indicators use useSpeech's explicit source IDs and speechProps attributes with global CSS, so playback lifecycle and visual feedback stay consistent across screens.
