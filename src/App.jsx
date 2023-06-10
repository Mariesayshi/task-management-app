import classes from "./App.module.css";
import Canvas from "./components/Canvas/Canvas";

function App() {
  return (
    <div id="app" className={classes.app}>
      <Canvas />
    </div>
  );
}

export default App;
