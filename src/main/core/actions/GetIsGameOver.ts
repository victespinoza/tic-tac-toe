import PositionCalculator from "../domain/PositionCalculator";

export default class GetIsGameOver {
  constructor(private positionCalculator: PositionCalculator) {}
  execute() {
    return this.positionCalculator.isGameOver();
  }
}
