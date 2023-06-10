import { useEffect} from "react";
import { fabric } from "fabric";
import createSubtask from "../../utils/subTask";
// import classes from "./Canvas.module.css";


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

const Canvas = () => {
  useEffect(() => {
    const canvas = new fabric.Canvas("c", {
      width: 1500,
      height: 1000,
      backgroundColor: "#f5f5f5",
    });

    const subTask = createSubtask(data);

    canvas.add(subTask);

    // infinite Canvas panning

    let panning = false;
    let canSelect = false;

    canvas.on("mouse:up", function () {
      panning = false;
    });

    canvas.on("mouse:down", function (e) {
      if (e.target === null && !canSelect) {
        panning = true;
        canvas.set({ selection: false });
      } else if (e.target === null && canSelect) {
        canvas.set({ selection: true });
      }
    });

    canvas.on("mouse:move", function (e) {
      if (panning && e && e.e) {
        // let units = 10;
        let delta = new fabric.Point(e.e.movementX, e.e.movementY);
        canvas.relativePan(delta);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Control") {
        canSelect = true;
      }
    });


    // document.addEventListener("keyup", (e) => {
    //   console.log(e)
    //   if (e.key === "Control") {
    //     canSelect = false;
    //   }
    // });

    // Canvas Zooming here
  }, []);

  return <canvas id="c"></canvas>;
};

export default Canvas;
