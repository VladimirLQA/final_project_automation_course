export function isCorrectAnswer(answer: number | string, correctAnswer: number): boolean {
    return answer === correctAnswer + 1;
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

