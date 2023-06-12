import { fabric } from "fabric";

let padding = 10;
let socketPadding = 10;

const createSocket = (
  dimensions,
  socketText,
  processesArr,
  top,
  type,
  io = true
) => {
  let socketBg = new fabric.Rect({
    fill: "transparent",
    width: dimensions.subTaskBg.width / 2 -dimensions.subTaskBg.strokeWidth + 1,
    height: dimensions.socketBg.height,
    originX:'left',
    left: dimensions.subTaskBg.strokeWidth,
  });

  let socketRect = new fabric.Rect({
    width: socketBg.height - 2 * socketPadding,
    height: socketBg.height - 2 * socketPadding,
    fill: "white",
    stroke: "black",
    strokeWidth: 1,
    top: socketPadding,
  });

  socketRect.set({
    left: io
      ? dimensions.subTaskBg.strokeWidth + padding
      : socketBg.width - socketRect.width - padding,
  });

  const createProcesses = (processWidth) => {
    return processesArr.map((process, i) => {
      return new fabric.Rect({
        width: processWidth / processesArr.length,
        height: socketRect.height + socketRect.strokeWidth,
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
          : socketBg.width -
            padding -
            socketRect.width -
            (processWidth / processesArr.length) * (i + 1),
      });
    });
  };

  const processesRect = new fabric.Group(createProcesses(socketRect.width / 2));

  processesRect.set({});

  let socketTitle = new fabric.Text(socketText, {
    fontSize: dimensions.socketTitle.fontSize,
    fontFamily: "Arial",

    fontWeight: dimensions.socketTitle.fontWeight,

    originX: "left",
    originY: "top",
    top: socketPadding + dimensions.subTaskBg.strokeWidth,
  });

  socketTitle.set({
    left: io
      ? 2.5 + padding + socketRect.width + processesRect.width + socketPadding
      : processesRect.left - socketTitle.width - socketPadding,
  });

  let socketType = new fabric.Text(type, {
    fontSize: dimensions.socketType.fontSize,
    fontFamily: "Arial",
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

const createSocketsArr = (dimensions, inputOutput, data, io) => {
  return data.sockets
    .filter((sckt) => sckt.io === inputOutput)
    .map((sckt, i) => {
      let processObj = data.processes.find((o) => o.id === sckt.process);

      let processesArr = [];
      let parentProcess;

      //   in case fn can't find a process in processes array
      if (processObj !== undefined) {
        processesArr.push(processObj);
        parentProcess = processObj.parentProcess;
      } else {
        parentProcess = null;
      }

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
        dimensions,
        sckt.name,
        processesArr,
        0 + dimensions.socketBg.height * i,
        sckt.type,
        io
      );
    });
};

export default createSocketsArr;
