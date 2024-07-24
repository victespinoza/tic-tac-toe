export default class Board extends Array<string> {
  private isGameOver: boolean = false;

  multiIndexOf(el: string): number[] {
    const ids = [];
    for (let i = this.length - 1; i >= 0; i--) {
      if (this[i] === el) {
        ids.unshift(i);
      }
    }
    return ids;
  }

  clone(): Board {
    const clonedBoard = new Board();
    clonedBoard.push(...this);
    clonedBoard.isGameOver = this.isGameOver;
    return clonedBoard;
  }

  getIsGameOver(): boolean {
    return this.isGameOver;
  }

  setIsGameOver(isGameOver: boolean) {
    this.isGameOver = isGameOver;
  }
}

export const PLAYER_SYMBOL = "X";
export const OPPONENT_SYMBOL = "O";
export const MAX_CELLS = 9;
