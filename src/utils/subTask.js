import { fabric } from "fabric";
import createSocketsArr from "./sockets";
let padding = 10;
// let socketPadding = 10;

const dimensions = {
  subTaskBg: {
    fill: "#e6e6e6e",
    stroke: "#2f0037",
    strokeWidth: 5,
    width:500,
    height: 230,
  },
  subTaskHeading: { height: 60, fill: "#e6e6e6" },
  subTaskHeadingText: { fontSize: 30, fontWeight: 600 },
  input: { fill: "#dee6b4" },
  output: { fill: "#eda0a0" },
  inputHeading: {fontSize: 15}, 
  socketBg: { height: 80 }, 
  socketRect: {fill: "white",
  stroke: "black",}, 
  socketTitle: {fontSize: 18,fontWeight: 600,},
  socketType: {fontSize: 14,}
  
};

console.log(dimensions);

const createSubtask = (data) => {
  let inputSocketsArr = createSocketsArr(dimensions,"input", data, true);
  let outputSocketsArr = createSocketsArr(dimensions,"output", data, false);

  const inputSocketGroup = new fabric.Group(inputSocketsArr, {});

  const outputSocketGroup = new fabric.Group(outputSocketsArr, {});

  let subTaskBg = new fabric.Rect({
    fill: dimensions.subTaskBg.fill,
    stroke: dimensions.subTaskBg.fill,
    strokeWidth: dimensions.subTaskBg.strokeWidth,
    width: dimensions.subTaskBg.width,
    height: dimensions.subTaskBg.height,
  });

  let subTaskHeading = new fabric.Rect({
    fill: dimensions.subTaskHeading.fill,
    width: subTaskBg.width - subTaskBg.strokeWidth,
    height: dimensions.subTaskHeading.height,
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
    fontSize: dimensions.subTaskHeadingText.fontSize,
    fontWeight: dimensions.subTaskHeadingText.fontWeight,
    fontFamily: "Arial",
    originX: "left",
    originY: "center",
    top: subTaskHeading.height / 2 + subTaskBg.strokeWidth,
    width: subTaskHeading.width,
    textAlign: "center",
  });

  let input = new fabric.Rect({
    width: subTaskHeading.width / 2,
    height: subTaskBg.height - subTaskBg.strokeWidth,
    fill: dimensions.input.fill,
    originX: "left",
    originY: "top",
    top: subTaskBg.strokeWidth,
    left: subTaskBg.strokeWidth,
    strokeWidth: 0,
  });

  let output = new fabric.Rect({
    width: subTaskHeading.width / 2,
    height: subTaskBg.height - subTaskBg.strokeWidth,
    fill: dimensions.output.fill,
    originX: "left",
    originY: "top",
    top: subTaskBg.strokeWidth,
    left: subTaskBg.strokeWidth + input.width,
    strokeWidth: 0,
  });

  let socketGroupOffset = subTaskBg.height;
  inputSocketGroup.set({ originY: "bottom", top: socketGroupOffset });

  outputSocketGroup.set({
    originY: "bottom",
    top: socketGroupOffset,
    left: output.left,
  });

  const createInputHeading = (heading, width, top, left = 0) => {
    return new fabric.Textbox(heading, {
      fontSize: dimensions.inputHeading.fontSize,
      fontFamily: "Arial",
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
    inputHeading.top,
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

export default createSubtask;
