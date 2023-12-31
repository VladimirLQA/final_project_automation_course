import * as readline from "readline";
import { ICli, IQuestion } from "../typings/interfaces/quiz.interfaces";
import { Timer } from "./timer.component";
import { displayMainMenuOptions, displayTopicOptions, menuQuestionExpired } from "../utils/helpers";

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

  async askPlayerName(attempts: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (attempts <= 0) {
        reject(new Error("No name provided within the specified attempts"));
        return;
      }

      this.rl.question("Enter your name: ", (name: string) => {
        if (name.trim().length > 0) {
          resolve(name.trim());
        } else {
          console.log(`Attempts left: ${attempts - 1}`);
          this.askPlayerName(attempts - 1).then(resolve).catch(reject);
        }
      });
    });
  }

  async displayMenu(): Promise<string> {
    return new Promise((resolve) => {
      displayMainMenuOptions();
      this.rl.question("Enter your choice: ", (choice: string) => {
        resolve(choice);
      });
    });
  }

  async displayAvailableTopics(timeoutMs: number, attempts: number): Promise<string> {
    const playerAnswerPromise = new Promise<string>((resolve, reject) => {
      if (attempts <= 0) {
        reject(new Error("No correct value provided within the specified attempts"));
        return;
      }

      displayTopicOptions();

      this.rl.question("Enter your choice: ", (choice: string) => {
        if (parseInt(choice, 10) <= 5 && parseInt(choice, 10) >= 1) {
          resolve(choice);
        } else {
          console.log(`Enter valid value. Attempts left: ${attempts - 1}`);
          this.displayAvailableTopics(menuQuestionExpired, attempts - 1).then(resolve).catch(reject);
        }
      });
    });

    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => {
        reject(new Error("Timeout: Player didn't provide an answer in time."));
      }, timeoutMs);
    });

    return Promise.race([playerAnswerPromise, timeoutPromise]);
  }

  async displayOptionsToEdit(timeoutMs: number, attempts: number): Promise<string> {
    const playerAnswerPromise = new Promise<string>((resolve, reject) => {
      if (attempts <= 0) {
        reject(new Error("No correct value provided within the specified attempts"));
        return;
      }
      console.log("Choose topic to play");
      console.log("1. Add question");
      console.log("2. Edit question");
      console.log("3. Delete question");
      this.rl.question("Enter your choice: \n", (choice: string) => {

        if (parseInt(choice, 10) <= 5 && parseInt(choice, 10) >= 1) {
          resolve(choice);
        } else {
          console.log("Enter the value from 1 to 5");
          this.displayOptionsToEdit(menuQuestionExpired, attempts - 1).then(resolve).catch(reject);
        }
      });
    });

    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => {
        reject(new Error("Timeout: Player didn't provide an answer in time."));
      }, timeoutMs);
    });

    return Promise.race([playerAnswerPromise, timeoutPromise]);
  }

  async displayAvailableTopicsToAddQuestions(timeoutMs: number, attempts: number): Promise<string> {
    const playerAnswerPromise = new Promise<string>((resolve, reject) => {
      if (attempts <= 0) {
        reject(new Error("No correct value provided within the specified attempts"));
        return;
      }
      console.log("Choose topic to add ");
      console.log("1. Movie");
      console.log("2. Cars");
      console.log("3. Technology");
      console.log("4. Science");
      this.rl.question("Enter your choice: ", (choice: string) => {

        if (parseInt(choice, 10) <= 5 && parseInt(choice, 10) >= 1) {
          resolve(choice);
        } else {
          console.log("Enter the value from 1 to 5");
          this.displayOptionsToEdit(menuQuestionExpired, attempts - 1).then(resolve).catch(reject);
        }
      });
    });

    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => {
        reject(new Error("Timeout: Player didn't provide an answer in time."));
      }, timeoutMs);
    });

    return Promise.race([playerAnswerPromise, timeoutPromise]);
  }

  // async enterQuestionToAdd(attempts: number): Promise<IQuestion> {
  //     return new Promise<IQuestion>((resolve, reject) => {
  //         if (attempts <= 0) {
  //             reject(new Error("No name provided within the specified attempts"));
  //             return;
  //         }
  //
  //         this.rl.question('Enter your question: ', (newQuestion: string) => {
  //             if (newQuestion) {
  //                 resolve(newQuestion as IQuestion);
  //             } else {
  //                 console.log(`Attempts left: ${attempts - 1}`);
  //                 this.enterQuestionToAdd(attempts - 1).then(resolve).catch(reject);
  //             }
  //         });
  //     });
  // }


  displayQuestion(question: IQuestion): void {
    console.log(`${question.question}`);
    question.options.forEach((option: string, index: number) => console.log(`${index + 1}: ${option}`));
  }

  displayResult(isCorrect: boolean, correctAnswer: string | number): void {
    if (isCorrect) {
      console.log("Your answer is correct :)\n");
    } else {
      console.log("Incorrect answer. The correct answer is " + correctAnswer + "\n");
    }
  }

  async getPlayerAnswer(timeoutMs: number): Promise<number> {
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
