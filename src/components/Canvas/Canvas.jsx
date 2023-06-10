import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import createSubtask from "../../utils/subTask";
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

    // let font = new FontFaceObserver('Roboto')
    // font.load().then(() => {
    //     console.log('loaded')

    //   }).catch(function() {
    //     alert('font loading failed ' + font);
    //   });

    // listeners for panning, zooming and selection
    const onCanvasSelection = () => {
      let active = canvas.getActiveObject();
      active.hasControls = false;
    };

    canvas.on("selection:created", onCanvasSelection);

    canvas.on("mouse:down", function (opt) {
      var evt = opt.e;
      this.isDragging = true;
      this.selection = true;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    });
    canvas.on("mouse:move", function (opt) {
      if (this.isDragging && opt.e.ctrlKey === true) {
        var e = opt.e;
        this.selection = false;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    canvas.on("mouse:up", function () {
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      // this.selection = true;
    });

    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 5) zoom = 5;
      if (zoom < 0.1) zoom = 0.1;
      if (zoom < 0.5) {
        canvas.set({ imageSmoothingEnabled: false });
      }
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    var ro = new ResizeObserver(() => {
      // canvas.setHeight(parent.offsetHeight);
      // canvas.setWidth(parent.offsetWidth);
      // canvas.renderAll();
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
