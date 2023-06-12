import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import createSubtask from "../../utils/subTask";
import addCanvasListeners from "../../utils/canvasListeners";
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
      selection: true,
    });

    let ro = new ResizeObserver(() => {
      canvas.setHeight(parent.offsetHeight);
      canvas.setWidth(parent.offsetWidth);
      canvas.renderAll();
    });

    ro.observe(parent);

    data.map((obj) => {
      const subTask = createSubtask(obj);
      subTask.hasControls = false;
      canvas.add(subTask);
      canvas.renderAll();
    });

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

    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    addCanvasListeners(canvas);

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
