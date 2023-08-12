import {GAMETOPICS} from "../typings/enums/quiz.enums";
import {GameTopicsType} from "../typings/types/quiz.types";

export function isCorrectAnswer(answer: number | string, correctAnswer: number): boolean {
    return answer === correctAnswer + 1;
}

export function isTimeExpired(expirationTime: number): boolean {
    const currentTime = new Date();
    const expirationDate = new Date(expirationTime);
    return currentTime >= expirationDate;
}

export const askPlayerNameAttempts: number = 3;
export const askPlayerTopic: number = 3;
export const askPlayerOption: number = 3;

export const expirationTime: number = Date.now() + 10000;
export const menuQuestionExpired: number = 20000;
export const quizQuestionExpired: number = 10000;

export function getRandomTopic(): GAMETOPICS {
    const topics = [GAMETOPICS.MOVIE, GAMETOPICS.CARS, GAMETOPICS.TECHNOLOGY, GAMETOPICS.SCIENCE];
    return topics[Math.floor(Math.random() * topics.length)];
}

export const gameTopics: GameTopicsType<GAMETOPICS> = {
    1: "movie",
    2: "cars",
    3: "technology",
    4: "science",
    5: getRandomTopic(),
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

