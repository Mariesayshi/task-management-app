import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import createSubtask from "../../utils/subTask";
import addCanvasListeners from "../../utils/canvasListeners";
import classes from "./Canvas.module.css";
import data from "../../data/sample_2";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // creating canvas, making it responsive to it's parent's dimensions (by obzerving with ro)
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

    addCanvasListeners(canvas);


    // returning cleanup functions for resize obzerver, canvas. 
    return () => {
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
