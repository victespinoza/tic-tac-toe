import { useBoardContext } from "./useBoardContext";

const Cell = ({ i }: { i: number }) => {
    const { state, action } = useBoardContext();
    const onClick = () => {
        action.registerClick(i);
    }
    return <div className={`tile${state.isGameOver ? ' game-over' : ''}`} onClick={onClick}>
        <div>{state.board[i]}</div>
    </div>
}

export default Cell;