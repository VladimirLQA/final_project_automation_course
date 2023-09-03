import { DifficultyLevel, GAMETOPICS } from "../enums/quiz.enums";
import { GameTopics, QuestionCollection } from "../types/quiz.types";

export interface IQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface IQuestionEditor {
    editQuestion(topic: GameTopics, index: number, editedQuestion: IQuestion): void;
    addQuestion(topic: GameTopics, question: IQuestion): void;
    deleteQuestionByIndex(index: number): void;
    // todo rewrite component to edit questions by topic provided
}

export interface IQuestionCollection {
    getRandomTopic(): string;
    getAllQuestions(): Promise<QuestionCollection>;
    getQuestionsByDifficulty(diffLvl: DifficultyLevel):  any;
    // todo getQuestionsByTopic: (topic: string): Question[];
}

export interface ITimerClass {
      start(): void;
      stop(): void;
      getElapsedTime(): number;
      isExpired(): boolean;
}

export interface IPlayer {
    incrementScore(points: number): void;
    getCurrentScore(): number;
    incrementProgress(): void;
    getCurrentProgress(): number;
    resetScoreAndProgress(): void;
}

export interface ICli {
    displayQuestion(question: IQuestion): void;
    getPlayerAnswer(timeoutMs: number): Promise<number | Error>;
    displayResult(isCorrect: boolean, correctAnswer: string | number): void;
    askPlayerName(attempts: number): void;
    close(): void;
}

export interface IGame {
    startGame(): Promise<void>;
    handleAnswer(playerAnswer: number | null, question?: IQuestion): void;
    finishGame(): void;
    // getGameResult(question: IQuestion): IGameResult;
}

// todo implement display of game result
export interface ISpentTimeOnQuestion {
    question: string;
    elapsedTime: number;
}

export interface IGameResult {
    progress: number;
    score: number;
    spentTimeOnQuestion: ISpentTimeOnQuestion[];
}
