import { beforeEach, expect, test, vi } from "vitest";
import PositionCalculator from "../main/core/domain/PositionCalculator";
import GameOverException from "../main/core/domain/GameOverException";
import Board from "../main/core/domain/Board";

beforeEach(() => {
  const mock = vi.spyOn(Board.prototype, "getIsGameOver");
  mock.mockImplementation(() => false);
});
test("Should throw exception is game is over", () => {
  const board = new Board();
  board.push(...["X", "X", "O", "O", "X", "O", "X", "O", "X"]);
  const board2 = new Board();
  board2.push(...(["X", "X", "X", "O", undefined, undefined, "O"] as Board));
  const board3 = new Board();
  board3.push(
    ...(["X", "O", "X", "X", undefined, undefined, "X", "O"] as Board)
  );
  const board4 = new Board();
  board4.push(
    ...(["X", "O", "X", undefined, "O", undefined, "X", "O"] as Board)
  );
  const board5 = new Board();
  board5.push(...(["X", "O", "X", "O", "X", undefined, "X", "O"] as Board));
  const positionCalculator = new PositionCalculator(board as Board);
  expect(() => positionCalculator.getNextPosition()).toThrowError(
    GameOverException
  );

  const positionCalculator2 = new PositionCalculator(board2 as Board);
  expect(() => positionCalculator2.getNextPosition()).toThrowError(
    GameOverException
  );

  const positionCalculator3 = new PositionCalculator(board3 as Board);
  expect(() => positionCalculator3.getNextPosition()).toThrowError(
    GameOverException
  );

  const positionCalculator4 = new PositionCalculator(board4 as Board);
  expect(() => positionCalculator4.getNextPosition()).toThrowError(
    GameOverException
  );

  const positionCalculator5 = new PositionCalculator(board5 as Board);
  expect(() => positionCalculator5.getNextPosition()).toThrowError(
    GameOverException
  );
});

test("Should return next position", () => {
  const board = new Board();
  board.push(
    ...(["X", "X", "O", undefined, undefined, undefined, "O"] as Board)
  );
  const expectedPositions = [3, 4, 5, 7, 8];
  const positionCalculator5 = new PositionCalculator(board as Board);
  const position = positionCalculator5.getNextPosition();
  expect(expectedPositions).toContain(position);
});
