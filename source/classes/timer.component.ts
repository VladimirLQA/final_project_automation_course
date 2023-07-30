import {ITimerClass} from "../typings/interfaces/quiz.interfaces";

export class Timer implements ITimerClass {
    private readonly timeLimit: number;
    private startTime: number;
    private timerId: NodeJS.Timeout | null = null;
    private elapsedTime: number;

    constructor(timeLimit: number) {
        this.timeLimit = timeLimit;
        this.startTime = 0;
        this.elapsedTime = 0;
    }

    start(): void {
        this.startTime = Date.now();
        this.timerId = setTimeout(() => {
            this.stop();
        }, this.timeLimit * 1000);
    }

    stop(): void {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }

    getElapsedTime(): number {
        const endTime = Date.now();
        this.elapsedTime = Math.floor((endTime - this.startTime) / 1000);
        return this.elapsedTime;
    }
}