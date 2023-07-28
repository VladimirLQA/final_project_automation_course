import {DifficultyLevel} from "../enums/quiz.enums";

export interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface QuestionEditor {
    editQuestion: (index: number, editedQuestion: Question) => void;
    addQuestion: (question: Question) => void;
    deleteQuestionByIndex: (index: number) => void;
    // todo rewrite component to edit questions by topic provided
}

export interface QuestionCollection {
    getRandomQuestion: () => Question;
    getAllQuestions: () => Question[];
    getQuestionsByDifficulty: (diffLvl: DifficultyLevel) => Question[];
    // todo getQuestionsByTopic: (topic: string): Question[];
}

export interface TimerClass {
      start: () => void;
      stop: () => number;
}