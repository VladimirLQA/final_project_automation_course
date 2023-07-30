import {DifficultyLevel} from "../enums/quiz.enums";

export interface IQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface IQuestionEditor {
    editQuestion(index: number, editedQuestion: IQuestion): void;
    addQuestion(question: IQuestion): void;
    deleteQuestionByIndex(index: number): void;
    // todo rewrite component to edit questions by topic provided
}

export interface IQuestionCollection {
    getRandomQuestion(): IQuestion;
    getAllQuestions(): IQuestion[];
    getQuestionsByDifficulty(diffLvl: DifficultyLevel):  IQuestion[];
    // todo getQuestionsByTopic: (topic: string): Question[];
}

export interface ITimerClass {
      start(): void;
      stop(): number;
}

export interface IPlayer {
    incrementScore(points: number): void;
    getCurrentScore(): number;
    resetCurrentScore(): void;
    incrementProgress(): void;
    gertCurrentProgress(): number;
    resetProgress(): void;
}

export interface ICli {
    displayQuestion(question: IQuestion): void;
    getPlayerAnswer(): Promise<number>;
    displayResult(isCorrect: boolean, correctAnswer: string | number): void;
    close(): void;
}