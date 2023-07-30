import {IQuestion, IQuestionEditor} from "../typings/interfaces/quiz.interfaces";

// todo rewrite component to edit questions by topic provided

export class QuestionEditor implements IQuestionEditor {
    private readonly questions: IQuestion[];
    constructor() {
        this.questions = [];
    }

    addQuestion(question: IQuestion): void {
        this.questions.push(question);
    }

    editQuestion(index: number, editedQuestion: IQuestion): void {
        if (index >= 0 && index < this.questions.length) {
            this.questions[index] = editedQuestion;
        } else {
            throw new Error("Invalid index provided");
        }
    }

    deleteQuestionByIndex(index: number): void {
        if (index >= 0 && index < this.questions.length) {
            this.questions.splice(index, 1);
        } else {
            throw new Error("Invalid index provided");
        }
    }
}