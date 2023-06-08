import classes from "./App.module.css";
import Canvas from "./components/Canvas/Canvas";

function App() {
  return (
    <div className={classes.app}>
      <Canvas />
    </div>
  );
}

export default App;
