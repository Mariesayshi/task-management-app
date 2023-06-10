import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import createSubtask from "../../utils/subTask";
import addInfiniteCanvasListeners from "../../utils/infiniteCanvas";
import classes from "./Canvas.module.css";
import data from "../../data/sample_2";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const parent = canvasRef.current.parentElement;
    const canvas = new fabric.Canvas("c", {
      width: parent.offsetWidth,
      height: parent.offsetHeight,
      imageSmoothingEnabled: true,
      backgroundColor: "#f5f5f5",
      selection: false,
    });

    const generateSubtasks = () => {
      data.map((obj) => {
        const subTask = createSubtask(obj);
        subTask.hasControls = false;
        canvas.add(subTask);
      });
    };

    generateSubtasks();


    addInfiniteCanvasListeners(canvas);

    var ro = new ResizeObserver(() => {
      canvas.setHeight(parent.offsetHeight);
      canvas.setWidth(parent.offsetWidth);
      canvas.renderAll();
    });

    ro.observe(parent);

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
