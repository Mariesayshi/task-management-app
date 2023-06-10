import { fabric } from "fabric";
import createSocketsArr from "./sockets"
let padding = 20;


const createSubtask = (data) => {
    let inputSocketsArr = createSocketsArr(data.sockets, "input", data, true );
    let outputSocketsArr = createSocketsArr(data.sockets, "output", data, false );

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

    let subTaskHeadingText = new fabric.Textbox(data.name, {
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

  export default createSubtask