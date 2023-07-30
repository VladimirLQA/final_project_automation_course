import {IQuestion, IGame} from "../typings/interfaces/quiz.interfaces";
import {QuestionCollection} from "./question_collection.component";
import {Cli} from "./cli.component";
import {Timer} from "./timer.component";
import {Player} from "./player.component";

import * as fs from "fs";

// const data = fs.readFileSync("/home/vlqa/Desktop/git_repositories/final_project_automation_course/source/questions_collection/question_collection.json", "utf-8");
// const parsedData = JSON.parse(data);

export class Game implements IGame {
    private questionCollection: QuestionCollection;
    private cli: Cli;
    private timer: Timer;
    private player: Player;

    constructor(playerName: string, questionCollection: QuestionCollection) {
        this.questionCollection = questionCollection;
        this.cli = new Cli();
        this.timer = new Timer(10);
        this.player = new Player(playerName);
    }

    async startGame(): Promise<void> {
        console.log('Welcome to quiz game\n');

        const questions = this.questionCollection.getAllQuestions();

        for (const question of questions) {
            this.cli.displayQuestion(question);
            this.timer.start();

            try {
                const playerAnswer = await this.cli.getPlayerAnswer();
                this.timer.stop();
                this.handleAnswer(playerAnswer, question);
            } catch (error: any) {
                this.timer.stop();
                console.log("Something went wrong");
                console.log("Error: " + error.message);
            }
        }

        this.finishGame();
    }

     handleAnswer(playerAnswer: number | null, question?: IQuestion): void {
        if (playerAnswer !== null && question) {
            const isAnswerCorrect = playerAnswer === question.correctAnswer + 1;

            this.cli.displayResult(isAnswerCorrect, question.correctAnswer + 1);
            this.player.incrementScore(10);
        } else {
            console.log('Время истекло или некорректный ввод.\n');
        }
        this.player.incrementProgress();
    }

    finishGame(): void {
        this.cli.close();
    }
}

const game = new Game("Vova", new QuestionCollection);
game.startGame()