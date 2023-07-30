import {IQuestion, IQuestionCollection} from "../typings/interfaces/quiz.interfaces";
import * as fs from "fs";
import {DifficultyLevel} from "../typings/enums/quiz.enums";

const data = fs.readFileSync("/home/vlqa/Desktop/git_repositories/final_project_automation_course/source/questions_collection/question_collection.json", "utf-8");



export class QuestionCollection implements IQuestionCollection {
    private readonly questions: IQuestion[];

    constructor() {
        this.questions = JSON.parse(data);
    }

    getRandomQuestion(): IQuestion {
        if (this.questions.length === 0) {
            throw new Error("Collection is empty");
        }

        return this.questions[Math.floor(Math.random() * this.questions.length)];
    }

    getAllQuestions(): IQuestion[] {
        return this.questions;
    }

    getQuestionsByDifficulty(diffLvl: DifficultyLevel): IQuestion[] {
        return this.questions.filter((question) => question.options.length === diffLvl);
    }


    // todo getQuestionsByTopic(topic: string): Question[] {}
}

