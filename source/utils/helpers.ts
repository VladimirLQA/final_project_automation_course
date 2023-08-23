import {GAMETOPICS} from "../typings/enums/quiz.enums";
import {GameTopics, GameTopicsType} from "../typings/types/quiz.types";
import {IQuestion} from "../typings/interfaces/quiz.interfaces";

export function isCorrectAnswer(answer: number | string, correctAnswer: number): boolean {
    return answer === correctAnswer + 1;
}


export function isTimeExpired(expirationTime: number): boolean {
    const currentTime = new Date();
    const expirationDate = new Date(expirationTime);
    return currentTime >= expirationDate;
}

export const askPlayerNameAttempts: number = 3;
export const askPlayerTopicAttempts: number = 3;
export const askPlayerOption: number = 3;

export const expirationTime: number = Date.now() + 10000;
export const menuQuestionExpired: number = 20000;
export const quizQuestionExpired: number = 10000;

export function getRandomTopic(): GAMETOPICS {
    const topics = [GAMETOPICS.MOVIE, GAMETOPICS.CARS, GAMETOPICS.TECHNOLOGY, GAMETOPICS.SCIENCE];
    return topics[Math.floor(Math.random() * topics.length)];
}

export function returnTopic(choice: string): GameTopics {
    let topic: GameTopics = "Movie";
    for (const key in gameTopics) {
        if (key == choice) {
            topic = gameTopics[key] as GameTopics;
        }
    }
    return topic;
}

export function displayTopicOptions(): void {
    const topics = [GAMETOPICS.MOVIE, GAMETOPICS.CARS, GAMETOPICS.TECHNOLOGY, GAMETOPICS.SCIENCE];
    console.log("\nChoose topic to play:");
    topics.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });
    console.log("5. Random")
}

export function displayMainMenuOptions(): void {
    console.log("Menu:");
    console.log("1. Play");
    console.log("2. Edit questions");
    console.log("3. Exit");
}


// export function isIndexCorrect(topic: GameTopics, index: number): boolean {
//     return index >= 0 && index < this.questions[topic].length;
// }

// export function convertQuestionToIQuestionType(question: string): IQuestion {
//     return Object.assign({}, question) as IQuestion
// }

export const gameTopics: GameTopicsType<GAMETOPICS> = {
    1: "Movie",
    2: "Cars",
    3: "Technology",
    4: "Science",
    5: getRandomTopic(),
};

export const temporaryQuestionToAdd: IQuestion = {
    "question": "Who is often called the father of the computer?",
    "options": ["Alan Turing", "Ada Lovelace", "Charles Babbage", "Henry Prevost Babbage"],
    "correctAnswer": 2
};

export const temporaryQuestionToEdit: IQuestion = {
    "question": "How many Lord of the Rings films are there?",
    "options": ["Three", "Four", "Six", "Five"],
    "correctAnswer": 2
};



// getGameResult(question: IQuestion): IGameResult {
//     return Object.assign({
//         progress: this.player.getCurrentScore(),
//         score: this.player.getCurrentScore(),
//         spentTimeOnQuestion: [{
//             question: question,
//             elapsedTime: this.timer.getElapsedTime(),
//         }]
//     });
// }

