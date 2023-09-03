import { IQuestion, IQuestionCollection } from "../typings/interfaces/quiz.interfaces";
import * as fs from "fs";
import { DifficultyLevel } from "../typings/enums/quiz.enums";
import { getRandomTopicUtil } from "../utils/helpers";

const data = fs.readFileSync("/home/vlqa/Desktop/git_repositories/final_project_automation_course/source/questions_collection/question_collection_with_topics.json", "utf-8");


export class QuestionCollection implements IQuestionCollection {
  private readonly questions: Record<string, IQuestion[]>;

  constructor() {
    this.questions = JSON.parse(data);
  }


  public getRandomTopic(): string {
    return getRandomTopicUtil();
  }

  public async getAllQuestions(): Promise<Record<string, IQuestion[]>> {
    return new Promise((resolve, _) => resolve(this.questions));
  }

  public getQuestionsByDifficulty(diffLvl: DifficultyLevel): any {
    return this.questions;
  }


  // todo getQuestionsByTopic(topic: string): Question[] {}
}
