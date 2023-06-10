import { fabric } from "fabric";

let padding = 20;
let socketPadding = 10;

const createSocket = (socketText, processesArr, top, type, io = true) => {
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
    fontSize: 18,
    fontWeight: 500,
    fontFamily: "Arial",
    originX: "left",
    originY: "top",
    top: socketPadding + 5,
  });

  socketTitle.set({
    left: io
      ? 2.5 + padding + socketRect.width + processesRect.width + socketPadding
      : processesRect.left - socketTitle.width - 10,
  });

  let socketType = new fabric.Text(type, {
    fontSize: 14,
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

const createSocketsArr = (inputOutput, data, io) => {
  return data.sockets
    .filter((sckt) => sckt.io === inputOutput)
    .map((sckt, i) => {
    //   console.log(data.processes, sckt.process);
      let processObj = data.processes.find((o) => o.id === sckt.process);
    //   console.log(processObj);

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

      return createSocket(sckt.name, processesArr, 0 + 80 * i, sckt.type, io);
    });
};

export default createSocketsArr;
