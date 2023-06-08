import { useEffect, useState } from "react";
import { fabric } from "fabric";
import classes from "./Canvas.module.css";

const Canvas = () => {
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    const canvas = new fabric.Canvas("c", {
      width: 1000,
      height: 800,
      backgroundColor: "#f5f5f5",
    });

    let subTaskBg = new fabric.Rect({
      fill: "white",
      stroke: "#2f0037",
      strokeWidth: 5,
      width: 600,
      height: 300,
    });

    let subTaskHeading = new fabric.Rect({
      fill: "#e6e6e6",
      width: subTaskBg.width - subTaskBg.strokeWidth,
      height: 60,
      originX: "left",
      originY: "top",
      strokeWidth: 0,
      top: subTaskBg.strokeWidth,
      left: subTaskBg.strokeWidth,
    });

    let subTaskHeadingText = new fabric.Textbox("MergeFiles", {
      fontSize: 30,
      fontFamily: "Roboto",
      originX: "left",
      originY: "top",

      // make this reusable
      top: subTaskHeading.height / 2 - 15,

      width: subTaskHeading.width,
      textAlign: "center",
    });

    let input = new fabric.Rect({
      width: subTaskHeading.width / 2,
      height: subTaskBg.height - subTaskBg.strokeWidth,
      fill: "#dee6b4",
      originX: "left",
      originY: "top",
      top: subTaskBg.strokeWidth,
      left: subTaskBg.strokeWidth,
      strokeWidth: 0,
    });

    let output = new fabric.Rect({
      width: subTaskHeading.width / 2,
      height: subTaskBg.height - subTaskBg.strokeWidth,
      fill: "#eda0a0",
      originX: "left",
      originY: "top",
      top: subTaskBg.strokeWidth,
      left: subTaskBg.strokeWidth + input.width,
      strokeWidth: 0,
    });

    let socketBg = new fabric.Rect({
      fill: "transparent",
      width: input.width,
      height: 80,
      left: 0,
    });

    let socketRect = new fabric.Rect({
      width: 70,
      height: 60,
      fill: "white",
      stroke: "black",
      strokeWidth: 1,
      left: 10,
      top: 10,
    });

    let process = new fabric.Rect({
      width: socketRect.width / 2,
      height: 61,
      fill: "#12cdd4",
      originX: "left",
      originY: "top",
      top: 10,
      left: 10 + socketRect.width,
      strokeWidth: 0,
    });

    let socketTitle = new fabric.Text("Socket #1", {
      fontSize: 18,
      fontFamily: "Roboto",
      originX: "left",
      originY: "top",
      top: 5 + 5,
      left: 10 + 1.5 * socketRect.width + 10,
    });

    let socketType = new fabric.Text("File", {
      fontSize: 14,
      fontFamily: "Roboto",
      originX: "left",
      originY: "top",
      top: (socketBg.height / 5) * 3,
      left: 10 + 1.5 * socketRect.width + 10,
    });

    let socket = new fabric.Group(
      [socketBg, process, socketRect, socketTitle, socketType],
      {
        left: 5,
        top: subTaskBg.height - socketBg.height,
      }
    );

    let subTask = new fabric.Group(
      [subTaskBg, input, output, subTaskHeading, subTaskHeadingText, socket],
      { left: 50, top: 10 }
    );
    canvas.add(subTask);

    // canvas.add(subTask);

    // infinite Canvas panning

    let panning = false;

    canvas.on("mouse:up", function (e) {
      panning = false;
    });

    canvas.on("mouse:down", function (e) {
      if (e.target === null) {
        panning = true;
      }
    });

    canvas.on("mouse:move", function (e) {
      if (panning && e && e.e) {
        let units = 10;
        let delta = new fabric.Point(e.e.movementX, e.e.movementY);
        canvas.relativePan(delta);
      }

      setFabricCanvas(canvas);
    });

    // Canvas Zooming
  }, []);

  return <canvas id="c"></canvas>;
};

export default Canvas;
