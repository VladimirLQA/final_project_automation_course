export function isCorrectAnswer(answer: number | string, correctAnswer: number): boolean {
    return answer === correctAnswer + 1;
}
// export function isTimeExpired(expirationTime: number): boolean {
//     const currentTime = new Date();
//     return currentTime >= expirationTime;
// }

export const basicQuestionExpired: number = 20000;
export const quizQuestionExpired = new Date(Date.now() + 10000);

export function getRandomTopic() {
    const topics = ["cars", "technology", "movies", "science"];
    return topics[Math.floor(Math.random() * topics.length)];
}









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

