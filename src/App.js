import "./styles/styles.css";
import { CanvasBG } from "./components/CanvasBG";
import { TodoWrapper } from "./components/TodoWrapper";

function App() {
  return (
    <div className="App">
      <CanvasBG />
      <TodoWrapper />
    </div>
  );
}

export default App;
