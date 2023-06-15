import { fabric } from "fabric";

const padding = 10;

const createSocket = (
  guide,
  socketText,
  processesArr,
  top,
  type,
  io = true
) => {
  let socketBg = new fabric.Rect({
    fill: "transparent",
    width: guide.subTaskBg.width / 2 - guide.subTaskBg.strokeWidth + 1,
    height: guide.socketBg.height,
    originX: "left",
    left: guide.subTaskBg.strokeWidth,
  });

  let socketRect = new fabric.Rect({
    width: socketBg.height - 2 * padding,
    height: socketBg.height - 2 * padding,
    fill: "white",
    stroke: "black",
    strokeWidth: 1,
    top: padding,
  });

  socketRect.set({
    left: io
      ? guide.subTaskBg.strokeWidth + padding
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
        top: padding,
        strokeWidth: 0,
        left: io
          ? guide.subTaskBg.strokeWidth +
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

  // processesRect.set({});

  let socketTitle = new fabric.Text(socketText, {
    fontSize: guide.socketTitle.fontSize,
    fontFamily: "Arial",

    fontWeight: guide.socketTitle.fontWeight,

    originX: "left",
    originY: "top",
    top: padding + guide.subTaskBg.strokeWidth,
  });

  socketTitle.set({
    left: io
      ? guide.subTaskBg.strokeWidth/2 + padding + socketRect.width + processesRect.width + padding
      : processesRect.left - socketTitle.width - padding,
  });

  let socketType = new fabric.Text(type, {
    fontSize: guide.socketType.fontSize,
    fontFamily: "Arial",
    originX: "left",
    originY: "top",
    top: (socketBg.height / 5) * 3,
  });

  socketType.set({
    left: io
      ? socketTitle.left
      : processesRect.left - socketType.width - padding,
  });

  return new fabric.Group(
    [socketBg, processesRect, socketRect, socketTitle, socketType],
    {
      top: top,
    }
  );
};

const createSocketsArr = (guide, inputOutput, data, io) => {
  return data.sockets
    .filter((sckt) => sckt.io === inputOutput)
    .map((sckt, i) => {
      // finding a starting process object for a socket
      let processObj = data.processes.find((o) => o.id === sckt.process);

      let processesArr = [];
      let parentProcess;

      //   in case can't find a process in processes array
      if (processObj !== undefined) {
        processesArr.push(processObj);
        parentProcess = processObj.parentProcess;
      } else {
        parentProcess = null;
      }

      // finding all the parent processes of the starting process and storing them in a processesArr array
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

      // creating each socket from data.sockets
      return createSocket(
        guide,
        sckt.name,
        processesArr,
        0 + guide.socketBg.height * i,
        sckt.type,
        io
      );
    });
};

export default createSocketsArr;
