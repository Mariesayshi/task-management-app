import { useEffect, useState } from "react";
import { fabric } from "fabric";
import classes from "./Canvas.module.css";

let padding = 20;
let socketPadding = 10;

const data = {
  id: "1",
  name: "Task_1",
  sockets: [
    {
      id: "1.i1",
      name: "In_Socket_1",
      type: "File",
      io: "input",
      process: "LightBlue",
    },
    {
      id: "1.i2",
      name: "In_Socket_2",
      type: "String",
      io: "input",
      process: "DarkBlue",
    },
    {
      id: "1.i3",
      name: "In_Socket_3",
      type: "String",
      io: "input",
      process: "DarkBlue",
    },
    {
      id: "1.o1",
      name: "Out_Socket_1",
      type: "File",
      io: "output",
      process: "LightBlue",
    },
    {
      id: "1.o2",
      name: "Out_Socket_2",
      type: "String",
      io: "output",
      process: "Orange",
    },
  ],
  processes: [
    {
      id: "LightBlue",
      parentProcess: null,
      color: "#ADD8E6",
    },
    {
      id: "DarkBlue",
      parentProcess: "LightBlue",
      color: "#00008B",
    },
    {
      id: "Orange",
      parentProcess: "DarkBlue",
      color: "#FF9033",
    },
  ],
  links: [],
  frontendOptions: {
    id: "1",
    positionInCanvas: [100, 200],
  },
};



const createSocket = (
  socketText,
  processesArr,
  top,
  type,
  io = true
) => {
  let socketBg = new fabric.Rect({
    fill: "transparent",
    width: 400,
    height: 80,
    left: 0,
  });

  let socketRect = new fabric.Rect({
    width: 60,
    height: 60,
    fill: "white",
    stroke: "black",
    strokeWidth: 1,
    top: socketPadding,
  });

  socketRect.set({
    left: io ? 5 + padding : socketBg.width - socketRect.width - padding,
  });

  // hereee
  const createProcesses = (processWidth) => {
    return processesArr.map((process, i) => {
      return new fabric.Rect({
        width: processWidth / processesArr.length,
        height: 61,
        fill: process.color,
        originX: "left",
        originY: "top",
        top: socketPadding,
        strokeWidth: 0,
        left: io
          ? 5 +
            padding +
            socketRect.width +
            (processWidth / processesArr.length) * i
          : socketBg.width - padding  - socketRect.width - (processWidth/processesArr.length)*(i+1),
      });
    });
  };

  const processesRect = new fabric.Group(createProcesses(socketRect.width / 2));

  processesRect.set({});


  let socketTitle = new fabric.Text(socketText, {
    fontSize: 18,
    fontWeight: 500,
    fontFamily: "Roboto",
    originX: "left",
    originY: "top",
    top: socketPadding + 5,
  });

  socketTitle.set({
    left: io
      ? 
        2.5 + padding + socketRect.width + processesRect.width + socketPadding
      : processesRect.left - socketTitle.width - 10,
  });

  let socketType = new fabric.Text(type, {
    fontSize: 14,
    fontFamily: "Roboto",
    originX: "left",
    originY: "top",
    top: (socketBg.height / 5) * 3,
  });

  socketType.set({
    left: io
      ? socketTitle.left
      : processesRect.left - socketType.width - socketPadding,
  });

  return new fabric.Group(
    [socketBg, processesRect, socketRect, socketTitle, socketType],
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

      let processesArr = [];
      processesArr.push(processObj);
      let parentProcess = processObj.parentProcess;

      while (parentProcess !== null) {
        let parentProcessObj = data.processes.find(
          (o) => o.id === parentProcess
        );

        if (parentProcess === parentProcessObj.parentProcess) {
          break;
        }
        processesArr.push(parentProcessObj);

        parentProcess = parentProcessObj.parentProcess;
      }

      return createSocket(
        sckt.name,
        processesArr,
        0 + 80 * i,
        sckt.type,
        io
      );
    });
};

const Canvas = () => {
  useEffect(() => {
    const canvas = new fabric.Canvas("c", {
      width: 1500,
      height: 1000,
      backgroundColor: "#f5f5f5",
    });

    const createSubtask = (name) => {
      let inputSocketsArr = createSocketsArr(data.sockets, "input");
      let outputSocketsArr = createSocketsArr(data.sockets, "output", false);

      const inputSocketGroup = new fabric.Group(inputSocketsArr, {});

      const outputSocketGroup = new fabric.Group(outputSocketsArr, {});

      let subTaskBg = new fabric.Rect({
        fill: "white",
        stroke: "#2f0037",
        strokeWidth: 5,
        width: 800,
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

      if (inputSocketGroup.height || outputSocketGroup.height >= input.height) {
        let newH;
        if (inputSocketGroup.height >= outputSocketGroup.height) {
          newH = inputSocketGroup.height;
        } else {
          newH = outputSocketGroup.height;
        }

        subTaskBg.set({
          height: newH + subTaskHeading.height + 80,
        });
      }

      let subTaskHeadingText = new fabric.Textbox(name, {
        fontSize: 30,
        fontWeight: 500,
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

      inputSocketGroup.set({ originY: "bottom", top: subTaskBg.height - 10 });

      outputSocketGroup.set({
        originY: "bottom",
        top: subTaskBg.height - 10,
        left: output.left,
      });

      const createInputHeading = (heading, width, top, left = 0) => {
        return new fabric.Textbox(heading, {
          fontSize: 20,
          fontFamily: "Roboto",
          originX: "left",
          originY: "top",
          top: top,
          width: width,
          textAlign: "center",
          left: left,
        });
      };

      const inputHeading = createInputHeading(
        "Input",
        input.width,
        subTaskBg.strokeWidth + subTaskHeading.height + padding
      );
      const outputHeading = createInputHeading(
        "Output",
        input.width,
        subTaskBg.strokeWidth + subTaskHeading.height + padding,
        subTaskBg.strokeWidth + input.width
      );

      return new fabric.Group(
        [
          subTaskBg,
          input,
          inputHeading,
          output,
          outputHeading,
          subTaskHeading,
          subTaskHeadingText,
          inputSocketGroup,
          outputSocketGroup,
        ],
        {
          left: data.frontendOptions.positionInCanvas[0],
          top: data.frontendOptions.positionInCanvas[1],
        }
      );
    };

    const subTask = createSubtask(data.name);

    canvas.add(subTask);

    // infinite Canvas panning

    let panning = false;

    canvas.on("mouse:up", function (e) {
      panning = false;
    });

    canvas.on("mouse:down", function (e) {
      if (e.target === null) {
        panning = true;
        canvas.set({ selection: false });
      }
    });

    canvas.on("mouse:move", function (e) {
      if (panning && e && e.e) {
        let units = 10;
        let delta = new fabric.Point(e.e.movementX, e.e.movementY);
        canvas.relativePan(delta);
      }
    });

    // Canvas Zooming here
  }, []);

  return <canvas id="c"></canvas>;
};

export default Canvas;
