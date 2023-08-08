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

export const expirationTime: number = Date.now() + 10000;
export const menuQuestionExpired: number = 20000;
export const quizQuestionExpired: number = 10000;

export function getRandomTopic() {
    const topics = ["cars", "technology", "movies", "science"];
    return topics[Math.floor(Math.random() * topics.length)];
}


console.log()




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

