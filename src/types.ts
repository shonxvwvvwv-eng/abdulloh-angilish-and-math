export type Subject = 'math' | 'english';

export type GradeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown or rich text explanation
  examples: string[];
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface UserStats {
  score: number;
  completedLessons: string[]; // lessonIds
  mathGamesPlayed: number;
  englishGamesPlayed: number;
  streak: number;
  lastActiveDate: string;
  stars: number;
  unlockedBadges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
