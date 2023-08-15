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

export function returnTopic(choice: string) {
    let topic: GameTopics = "movie";
    for (const key in gameTopics) {
        if (key == choice) {
            topic = gameTopics[key] as GameTopics;
        }
    }
    return topic;
}

export const gameTopics: GameTopicsType<GAMETOPICS> = {
    1: "movie",
    2: "cars",
    3: "technology",
    4: "science",
    5: getRandomTopic(),
};

export const temporaryQuestionToAdd: IQuestion = {
    "question": "Who is often called the father of the computer?",
    "options": ["Alan Turing", "Ada Lovelace", "Charles Babbage", "Henry Prevost Babbage"],
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

