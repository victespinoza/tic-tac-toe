import './App.css'
import Board from './main/ui/Board';
import { BoardContextProvider } from './main/ui/useBoardContext';

function App() {

  return (
    <BoardContextProvider>
      <div>
        <Board />
      </div>
    </BoardContextProvider>
  )
}



export default App
