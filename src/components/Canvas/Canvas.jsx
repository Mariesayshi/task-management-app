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

    const onKeydown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        canvas.selection = true;
      }
    };
    const onKeyup = (e) => {
      if (e.key === "Control" || e.key === "Command") {
        canvas.selection = false;
      }
    };

    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    addInfiniteCanvasListeners(canvas);

    let ro = new ResizeObserver(() => {
      canvas.setHeight(parent.offsetHeight);
      canvas.setWidth(parent.offsetWidth);
      canvas.renderAll();
    });

    ro.observe(parent);

    return () => {
      canvas.dispose();
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("keyup", onKeyup);
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
