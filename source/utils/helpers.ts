export function isCorrectAnswer(answer: number | string, correctAnswer: number): boolean {
    return answer === correctAnswer + 1;
}
export function isTimeExpired(expirationTime: Date): boolean {
    const currentTime = new Date();
    return currentTime >= expirationTime;
}

export const expirationTime = new Date(Date.now() + 15000);
// export const expirationTime = new Date(Date.now() + 15000);

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

