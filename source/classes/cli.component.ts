import * as readline from "readline";
import {ICli, IQuestion} from "../typings/interfaces/quiz.interfaces";
import * as fs from "fs";
import {Timer} from "./timer.component";
import {menuQuestionExpired} from "../utils/helpers";


// const data = fs.readFileSync("/home/vlqa/Desktop/git_repositories/final_project_automation_course/source/questions_collection/question_collection.json", "utf-8");
// const parsedData = JSON.parse(data);


export class Cli implements ICli {
    private rl: readline.Interface;
    private timer: Timer;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.timer = new Timer(10);
    }

    async askPlayerName(): Promise<string | void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Enter your name: ', (name: string) => {
                if(name != null) {
                    resolve(name);
                } else {
                    console.log('Game over ///////');
                    this.rl.close();
                }
            });
        });
    }

    async displayMenu(): Promise<number> {
        return new Promise((resolve) => {
            console.log("Menu:");
            console.log("1. Play");
            console.log("2. Edit questions");
            console.log("3. Exit");
            this.rl.question("Enter your choice: ", (choice: string) => {
                const selectedOption = parseInt(choice, 10);
                resolve(selectedOption);
            });
        });
    }

    async displayAvailableTopics(timeoutMs: number): Promise<number> {
        const playerAnswerPromise =  new Promise<number>((resolve) => {
            console.log("Choose topic to play");
            console.log("1. Movie");
            console.log("2. Cars");
            console.log("3. Technology");
            console.log("4. Science");
            console.log("5. Random");
            this.rl.question("Enter your choice: " + "\n", (choice: string) =>  resolve(parseInt(choice, 10)));
        });

        const timeoutPromise = new Promise<number>((_, reject) => {
            setTimeout(() => {
                reject(new Error("Timeout: Player didn't provide an answer in time."));
            }, timeoutMs);
        });

        return Promise.race([playerAnswerPromise, timeoutPromise]);
    }

    displayQuestion(question: IQuestion): void {
        console.log(question.question);
        question.options.forEach((option: string, index: number) => console.log(`${index + 1}: ${option}`));
    }

    displayResult(isCorrect: boolean, correctAnswer: string | number): void {
        if (isCorrect) {
            console.log("Your answer is correct :)");
        } else {
            console.log("Incorrect answer. The correct answer is " + correctAnswer);
        }
    }

    // async getPlayerAnswer(): Promise<number> {
    //     return new Promise((resolve) => {
    //         this.rl.question("Your answer (enter the number): ", (answer: string) => resolve(parseInt(answer.trim(), 10)));
    //     });
    // }

    async getPlayerAnswer(timeoutMs: number): Promise<number>  {
        const playerAnswerPromise = new Promise<number>((resolve) => {
            this.rl.question("Your answer (enter the number): ", (answer: string) => {
                resolve(parseInt(answer.trim(), 10));
            });
        });

        const timeoutPromise = new Promise<number>((_, reject) => {
            setTimeout(() => {
                reject(new Error("Timeout: Player didn't provide an answer in time."));
            }, timeoutMs);
        });

        return Promise.race([playerAnswerPromise, timeoutPromise]);
    }

    close(): void {
        this.rl.close();
    }
}

// const question: IQuestion = parsedData[0];
//
// const cli = new Cli();
//
// cli.displayQuestion(question);
// cli.getPlayerAnswer().then((playerAnswer) => {
//     const isCorrect = playerAnswer === question.correctAnswer + 1;
//     cli.displayResult(isCorrect, question.correctAnswer + 1);
//     cli.close();
// });