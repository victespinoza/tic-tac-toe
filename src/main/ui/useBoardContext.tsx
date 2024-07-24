import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import GetOpponentPosition from "../core/actions/GetOpponentPosition";
import Board, { OPPONENT_SYMBOL, PLAYER_SYMBOL } from "../core/domain/Board";
import GameOverException from "../core/domain/GameOverException";
import GetIsGameOver from "../core/actions/GetIsGameOver";
import PositionCalculator from "../core/domain/PositionCalculator";

interface BoardProps {
    action: { registerClick: (pos: number) => {} },
    state: { board: Board, isGameOver: boolean }
}

const BoardContext = createContext({} as BoardProps);
export const useBoardContext = () => useContext(BoardContext);

export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
    const [board, setBoard] = useState<Board>(new Board());
    const [isGameOver, setGameOver] = useState(false);

    useEffect(() => {
        const positionCalculator = new PositionCalculator(board);
        const gameOver = new GetIsGameOver(positionCalculator).execute();
        if (gameOver) {
            setGameOver(gameOver)
        }
    }, [board])

    const initialValue = {
        action: {
            registerClick: (position: number) => {
                if (isGameOver) return;
                setBoard((b: Board) => {
                    b[position] = PLAYER_SYMBOL;
                    return b.clone();
                })
                setTimeout(() => {
                    setBoard((b: Board) => {
                        try {
                            const positionCalculator = new PositionCalculator(b);
                            const opponentPosition = new GetOpponentPosition(positionCalculator).execute();
                            b[opponentPosition] = OPPONENT_SYMBOL;
                            return b.clone();
                        } catch (e) {
                            if (e instanceof GameOverException) {
                                setGameOver(true);
                            } else {
                                console.error(e);
                                throw e;
                            }

                            return b;
                        }
                    })
                }, 300)
            },
        },
        state: {
            board,
            isGameOver
        }
    } as BoardProps
    return <BoardContext.Provider value={initialValue}>{children}</BoardContext.Provider>
}
