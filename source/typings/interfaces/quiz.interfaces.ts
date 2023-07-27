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
    // todo getQuestionsByTopic: (topic: string): Question[];
}