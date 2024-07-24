import PositionCalculator from "../domain/PositionCalculator";

export default class GetOpponentPosition {
  constructor(private positionCalculator: PositionCalculator) {}

  execute(): number {
    return this.positionCalculator.getNextPosition();
  }
}
