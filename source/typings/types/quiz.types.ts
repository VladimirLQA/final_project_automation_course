import {IQuestion} from "../interfaces/quiz.interfaces";

export type GameTopicsType<T> = {
    [Key in keyof typeof T]: T[Key]
};

export type QuestionCollection = Record<string, IQuestion[]>;