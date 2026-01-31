
export type SubjectId = 'physics' | 'maths' | 'chemistry' | 'biology' | 'cs' | 'physed' | 'english';

export interface Chapter {
  id: string;
  title: string;
  description: string;
  notes: string;
  importantQuestions: Question[];
}

export interface Question {
  id: string;
  text: string;
  answer: string;
  yearFrequency: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
