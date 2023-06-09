import { useEffect, useState } from "react";
import { fabric } from "fabric";
import classes from "./Canvas.module.css";

const data = {
  id: "1",
  name: "MergeFiles",
  sockets: [
    {
      id: "6",
      name: "Merged_File",
      type: "File",
      io: "input",
      process: "MRTW_LightBlue",
    },
    {
      id: "7",
      name: "Well_File",
      type: "File",
      io: "output",
      process: "MRTW_DarkBlue",
    },
  ],
  processes: [
    {
      id: "MRTW_LightBlue",
      parentProcess: null,
      color: "#ADD8E6",
    },
    {
      id: "MRTW_DarkBlue",
      parentProcess: "LightBlue",
      color: "#00008B",
    },
  ],
  links: [],
  frontendOptions: {
    id: "1",
    positionInCanvas: [0, 0],
  },
};

const createSocket = (socketText, processColor, top, type, io = true) => {
  let socketBg = new fabric.Rect({
    fill: "transparent",
    width: 300,
    height: 80,
    left: 0,
  });

  let socketRect = new fabric.Rect({
    width: 70,
    height: 60,
    fill: "white",
    stroke: "black",
    strokeWidth: 1,
    top: 10,
  });

  socketRect.set({ left: io ? 10 : socketBg.width - socketRect.width - 10 });

  let process = new fabric.Rect({
    width: socketRect.width / 2,
    height: 61,
    fill: processColor,
    originX: "left",
    originY: "top",
    top: 10,
    left: socketRect.left - socketRect.width / 2,
    strokeWidth: 0,
  });

  process.set({
    left: io ? 10 + socketRect.width : socketRect.left - process.width,
  });

  let socketTitle = new fabric.Text(socketText, {
    fontSize: 18,
    fontFamily: "Roboto",
    originX: "left",
    originY: "top",
    top: 5 + 5,
  });

  socketTitle.set({
    left: io
      ? 10 + 1.5 * socketRect.width + 10
      : process.left - socketTitle.width - 10,
  });

  let socketType = new fabric.Text(type, {
    fontSize: 14,
    fontFamily: "Roboto",
    originX: "left",
    originY: "top",
    top: (socketBg.height / 5) * 3,
  });

  socketType.set({
    left: io ? socketTitle.left : process.left - socketType.width - 10,
  });

  return new fabric.Group(
    [socketBg, process, socketRect, socketTitle, socketType],
    {
      top: top,
    }
  );
};


const createSocketsArr = (arr, inputOutput, io) => {
  return arr
    .filter((sckt) => sckt.io === inputOutput)
    .map((sckt, i) => {
      let processObj = data.processes.find((o) => o.id === sckt.process);
      return createSocket(
        sckt.name,
        processObj.color,
        0 + 80 * i,
        sckt.type,
        io
      );
    });
};

const Canvas = () => {
  // ??? am fabricCanvas-ს არსად არ ვიყენებ?
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

    let inputSocketsArr = createSocketsArr(data.sockets, "input");
    let outputSocketsArr = createSocketsArr(data.sockets, "output", false);

    const inputSocketGroup = new fabric.Group(inputSocketsArr, {
      originY: "bottom",
      top: subTaskBg.height,
    });

    const outputSocketGroup = new fabric.Group(outputSocketsArr, {
      originY: "bottom",
      top: subTaskBg.height,
      left: output.left,
    });

    let subTask = new fabric.Group(
      [
        subTaskBg,
        input,
        output,
        subTaskHeading,
        subTaskHeadingText,
        inputSocketGroup,
        outputSocketGroup,
      ],
      { left: 50, top: 10 }
    );

    canvas.add(subTask);

    // infinite Canvas panning

    let panning = false;

    canvas.on("mouse:up", function (e) {
      panning = false;
    });

    canvas.on("mouse:down", function (e) {
      console.log(e.target);

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
