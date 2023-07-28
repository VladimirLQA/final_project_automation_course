import {Question, QuestionCollection} from "../typings/interfaces/quiz.interfaces";
import fs from "fs";
import {DifficultyLevel} from "../typings/enums/quiz.enums";

const data = fs.readFileSync("/home/vlqa/Desktop/git_repositories/final_project_automation_course/source/questions_collection/question_collection.json", "utf-8");



class QuestionCollection implements QuestionCollection {
    private readonly questions: Question[];

    constructor() {
        this.questions = JSON.parse(data);
    }

    getRandomQuestion(): Question {
        if (this.questions.length === 0) {
            throw new Error("Collection is empty");
        }

        return this.questions[Math.floor(Math.random() * this.questions.length)];
    }

    getAllQuestions(): Question[] {
        return this.questions;
    }

    getQuestionsByDifficulty(diffLvl: DifficultyLevel): Question[] {
        return this.questions.filter((question) => question.options.length === diffLvl);
    }


    // todo getQuestionsByTopic(topic: string): Question[] {}
}

