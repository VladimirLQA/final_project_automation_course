import {IQuestion, IQuestionEditor} from "../typings/interfaces/quiz.interfaces";
import {GameTopics, QuestionCollection} from "../typings/types/quiz.types";
import {GAMETOPICS} from "../typings/enums/quiz.enums";

// todo rewrite component to edit questions by topic provided

export class QuestionEditor implements IQuestionEditor {
    private  questions: QuestionCollection = {};

    public setQuestions(startQuestions: QuestionCollection): void {
        this.questions = startQuestions;
    }

    addQuestion(topic: GameTopics, question: IQuestion): void {

    }

    editQuestion(index: number, editedQuestion: IQuestion): void {
        // if (index >= 0 && index < this.questions.length) {
        //     this.questions[index] = editedQuestion;
        // } else {
        //     throw new Error("Invalid index provided");
        // }
    }

    deleteQuestionByIndex(index: number): void {
        // if (index >= 0 && index < this.questions.length) {
        //     this.questions.splice(index, 1);
        // } else {
        //     throw new Error("Invalid index provided");
        // }
    }
}

