import {IQuestion, IQuestionCollection} from "../typings/interfaces/quiz.interfaces";
import * as fs from "fs";
import {DifficultyLevel} from "../typings/enums/quiz.enums";
import {getRandomTopic} from "../utils/helpers";

const data = fs.readFileSync("/home/vlqa/Desktop/git_repositories/final_project_automation_course/source/questions_collection/question_collection_with_topics.json", "utf-8");


export class QuestionCollection implements IQuestionCollection {
    private readonly questions: Record<string, IQuestion[]>;

    constructor() {
        this.questions = JSON.parse(data);
    }


    getRandomQuestion(): IQuestion {
        const randomTopic: string = getRandomTopic();
        const questionsTopic = this.questions[randomTopic];
        return questionsTopic[Math.floor(Math.random() * questionsTopic.length)];

    }

    getAllQuestions(): Record<string, IQuestion[]> {
        return this.questions;
    }

    getQuestionsByDifficulty(diffLvl: DifficultyLevel): any {
        return this.questions;
    }


    // todo getQuestionsByTopic(topic: string): Question[] {}
}