import { MAX_CELLS } from "../core/domain/Board";
import Cell from "./Cell";
import { useBoardContext } from "./useBoardContext";

const Board = () => {
    const { state } = useBoardContext();
    return (
        <>
            <div id="board" className={`center`}>
                {Array(MAX_CELLS).fill(0).map((v, i) => {
                    return <Cell i={i} key={i} />
                })}

            </div>
        </>
    )
}

export default Board;