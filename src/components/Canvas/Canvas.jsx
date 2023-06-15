import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import createSubtask from "../../utils/subTask";
import addCanvasListeners from "../../utils/canvasListeners";
import classes from "./Canvas.module.css";
import data from "../../data/sample_2";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // creating canvas, making it responsive to it's parents dimensions (stored in useRefm, obzerved by ro)
    const parent = canvasRef.current.parentElement;
    const canvas = new fabric.Canvas("c", {
      width: parent.offsetWidth,
      height: parent.offsetHeight,
      imageSmoothingEnabled: true,
      fireMiddleClick: true,
      backgroundColor: "#f5f5f5",
      selection: true,
    });

    
    let ro = new ResizeObserver(() => {
      canvas.setHeight(parent.offsetHeight);
      canvas.setWidth(parent.offsetWidth);
      canvas.renderAll();
    });

    ro.observe(parent);


// generating and adding to canvas all the subTasks from the data object
    data.map((obj, i) => {
      const subTask = createSubtask(obj);
      subTask.hasControls = false;
      subTask.id = 'task_'+(i+1);
      canvas.add(subTask);
      canvas.renderAll();
    });


    // setting panning and zoomming and their controls
    const onKeydown = (e) => {
      if (e.key === "Control" || e.key === "Command") {
        canvas.selection = false;
      }
    };

    const onKeyup = (e) => {
      if (e.key === "Control" || e.key === "Command") {
        canvas.selection = true;
      }
    };

    document. addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    addCanvasListeners(canvas);


    // returning cleanup functions for the listeners, resize obzerver, canvas. 
    return () => {
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("keyup", onKeyup);
      canvas.dispose();
      ro.disconnect();
    };
  }, []);

  return (
    <div className={classes.Canvas} ref={canvasRef}>
      <canvas id="c"></canvas>
    </div>
  );
};

export default Canvas;
