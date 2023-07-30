import {IPlayer} from "../typings/interfaces/quiz.interfaces";

export class Player implements IPlayer {
    private playerName: string;
    private score: number;
    private progress: number;

    constructor(playerName: string) {
        this.playerName = playerName;
        this.score = 0;
        this.progress = 0;
    }

    gertCurrentProgress(): number {
        return this.progress;
    }

    getCurrentScore(): number {
        return this.score;
    }

    incrementProgress(): void {
        this.progress++;
    }

    incrementScore(points: number): void {
        this.score += points;
    }

    resetCurrentScore(): void {
        this.score = 0;
    }

    resetProgress(): void {
        this.progress = 0;
    }
}