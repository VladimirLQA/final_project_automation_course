import {IQuestion, IGame, IGameResult} from "../typings/interfaces/quiz.interfaces";
import {QuestionCollection} from "./question_collection.component";
import {Cli} from "./cli.component";
import {Timer} from "./timer.component";
import {Player} from "./player.component";

import * as fs from "fs";
import {askPlayerNameAttempts, isCorrectAnswer, menuQuestionExpired, quizQuestionExpired} from "../utils/helpers";

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
        this.timer = new Timer(5);
        this.player = new Player(playerName);
    }

    async startGame(): Promise<void> {
        console.log("Welcome to quiz game.............................\n");

        try {
            const playerName = await this.cli.askPlayerName(askPlayerNameAttempts);
            console.log(`Welcome, ${playerName}!. Make your choice!`);
        } catch (error: any) {
            console.error(error.message);
            this.cli.close();
            return;
        }

        while (true) {
            try {
                const menuChoice = await this.cli.displayMenu();
                switch (menuChoice) {
                    case 1:
                        try {
                            const topic = await this.cli.displayAvailableTopics(menuQuestionExpired);
                            await this.playGame(topic);
                        } catch (error: any) {
                            console.log("Error: " + error.message);
                            this.cli.close();
                        }
                        return;
                    case 2:
                        await this.editQuestions();
                        return;
                    case 3: // Exit option
                        console.log("Exiting the game.");
                        this.cli.close();
                        return;
                    default:
                        console.log("Invalid choice. Exiting the game.");
                }
            } catch (err: any) {
                console.log(err)
            }
        }
    }

    async playGame(topic: number): Promise<void> {
        const allQuestions = await this.questionCollection.getAllQuestions();
        const gameTopic = Object.keys(allQuestions)[topic - 1];

        for (let i = 0; i < allQuestions[gameTopic].length; i++) {
            const question = allQuestions[gameTopic][i];
            this.cli.displayQuestion(question);

            try {
                this.timer.start();
                const playerAnswer = await this.cli.getPlayerAnswer(quizQuestionExpired);
                if (this.timer.isExpired()) {
                    this.timer.stop();
                    this.handleAnswer(null, question);
                } else {
                    this.handleAnswer(playerAnswer, question);
                }
            } catch (error: any) {
                this.timer.stop();
                console.log("Error: " + error.message);
            }
        }

        this.finishGame();
    }

    editQuestions(): void {

    }

    handleAnswer(playerAnswer: number | null, question?: IQuestion): void {
        if (playerAnswer !== null && question) {
            const isAnswerCorrect = isCorrectAnswer(playerAnswer, question.correctAnswer);
            this.cli.displayResult(isAnswerCorrect, question.correctAnswer + 1);
            if (isAnswerCorrect) {
                this.player.incrementScore(10);
                this.player.incrementProgress();
            }
        } else {
            console.log("Time's up");
        }
    }

    finishGame(): void {
        console.log('Quiz is over. Your final results:');
        console.log('> Score: ' + this.player.getCurrentScore());
        console.log('> Progress: ' + this.player.getCurrentProgress() + '/' + +5);
        this.cli.close();
    }
}

const game = new Game("Vova", new QuestionCollection);
game.startGame();