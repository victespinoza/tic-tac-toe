import Board, { MAX_CELLS } from "./Board";
import GameOverException from "./GameOverException";

export default class PositionCalculator {
  constructor(private board: Board) {}

  getNextPosition(): number {
    if (this.isGameOver()) {
      this.board.setIsGameOver(true);
      throw new GameOverException();
    }
    let position = -1;
    do {
      position = this.getRandomPosition(MAX_CELLS - 1);
    } while (this.board[position]);
    return position;
  }

  isGameOver(): boolean {
    return (
      this.board.getIsGameOver() ||
      !this.thereAreMorePlays() ||
      this.thereAreAWinner()
    );
  }

  private thereAreMorePlays(): boolean {
    for (let i = 0; i < MAX_CELLS; i++) {
      if (!this.board[i]) {
        return true;
      }
    }
    return false;
  }

  private thereAreAWinner(): boolean {
    if (
      this.isSameValidLine(this.board[0], this.board[1], this.board[2]) ||
      this.isSameValidLine(this.board[3], this.board[4], this.board[5]) ||
      this.isSameValidLine(this.board[6], this.board[7], this.board[8])
    ) {
      return true;
    }

    if (
      this.isSameValidLine(this.board[0], this.board[3], this.board[6]) ||
      this.isSameValidLine(this.board[1], this.board[4], this.board[7]) ||
      this.isSameValidLine(this.board[2], this.board[5], this.board[8])
    ) {
      return true;
    }

    if (
      this.isSameValidLine(this.board[0], this.board[4], this.board[8]) ||
      this.isSameValidLine(this.board[2], this.board[4], this.board[6])
    ) {
      return true;
    }
    return false;
  }

  private isSameValidLine(first: string, second: string, third: string) {
    return first && first === second && third === second;
  }

  private getRandomPosition(maxNumber: number) {
    return Math.floor(Math.random() * maxNumber) + 1;
  }
}
