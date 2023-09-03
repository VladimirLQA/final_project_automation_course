import { IQuestion, IGame, IGameResult, ICli } from "../typings/interfaces/quiz.interfaces";
import { QuestionCollection } from "./question_collection.component";
import { Cli } from "./cli.component";
import { Timer } from "./timer.component";
import { Player } from "./player.component";

import * as fs from "fs";
import {
  askPlayerNameAttempts,
  isCorrectAnswer,
  menuQuestionExpired,
  quizQuestionExpired,
  gameTopics, askPlayerOption, askPlayerTopicAttempts, returnTopic, temporaryQuestionToAdd, temporaryQuestionToEdit
} from "../utils/helpers";
import { QuestionEditor } from "./question_editor.component";
import { GameTopics } from "../typings/types/quiz.types";

// const data = fs.readFileSync("/home/vlqa/Desktop/git_repositories/final_project_automation_course/source/questions_collection/question_collection.json", "utf-8");
// const parsedData = JSON.parse(data);

export class Game implements IGame {
  private questionCollection: QuestionCollection;
  private cli: Cli;
  private timer: Timer;
  private player: Player;
  private editor: QuestionEditor;

  constructor(playerName: string, questionCollection: QuestionCollection) {
    this.questionCollection = questionCollection;
    this.cli = new Cli();
    this.timer = new Timer(5);
    this.player = new Player(playerName);
    this.editor = new QuestionEditor();
  }

  async startGame(): Promise<void> {
    console.log("Welcome to quiz game.............................");

    try {
      const playerName = await this.cli.askPlayerName(askPlayerNameAttempts);
      console.log(`Welcome, ${playerName}!. Make your choice!\n`);
    } catch (error: any) {
      console.error(error.message);
      this.cli.close();
      return;
    }

    await this.runMainMenu();
  }

  async runMainMenu(): Promise<void> {
    while (true) {
      try {
        const menuChoice = await this.cli.displayMenu();
        switch (menuChoice) {
        case "1":
          try {
            const topic = await this.cli.displayAvailableTopics(menuQuestionExpired, askPlayerTopicAttempts);
            await this.playGame(topic);
          } catch (error: any) {
            console.log("Error: " + error.message);
            this.cli.close();
          }
          return;
        case "2":
          try {
            this.editor.setQuestions(await this.questionCollection.getAllQuestions());
            const option = await this.cli.displayOptionsToEdit(menuQuestionExpired, askPlayerOption);
            // await this.editQuestions(option);
          } catch (error: any) {
            console.log("Error: " + error.message);
          }
          return;
        case "3": // Exit option
          console.log("Exiting the game.");
          this.cli.close();
          return;
        default:
          console.log("Invalid choice. Exiting the game.");
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  }

  async playGame(topic: string): Promise<void> {
    const allQuestions = await this.questionCollection.getAllQuestions();
    const gameTopic: GameTopics = returnTopic(topic);

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
    await this.runMainMenu();
  }

  // async editQuestions(option: string | number): Promise<void> {
  //     if (option == 1) {
  //         const topicToAdd = await this.cli.displayAvailableTopicsToAddQuestions(menuQuestionExpired, askPlayerTopicAttempts);
  //         const gameTopic: GameTopics = returnTopic(topicToAdd);
  //         const newQuestionToAdd: IQuestion = await this.cli.enterQuestionToAdd(askPlayerOption)
  //         // this.editor.addQuestion(gameTopic, newQuestionToAdd);
  //     } else if (option == 2) {
  //         const topicToEdit = await this.cli.displayAvailableTopicsToAddQuestions(menuQuestionExpired, askPlayerTopicAttempts);
  //         const gameTopic: GameTopics = returnTopic(topicToEdit);
  //         // this.editor.editQuestion(gameTopic, 1, temporaryQuestionToEdit);
  //     }
  // }

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
    console.log("Quiz is over. Your final results:");
    console.log("> Score: " + this.player.getCurrentScore());
    console.log("> Progress: " + this.player.getCurrentProgress());

  }
}

const game = new Game("Vova", new QuestionCollection());
game.startGame();
