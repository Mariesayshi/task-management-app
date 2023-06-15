import { fabric } from "fabric";
import createSocketsArr from "./sockets";

const padding = 10;

// general dimensions of the subTask
const guide = {
  subTaskBg: {
    fill: "#e6e6e6e",
    stroke: "#2f0037",
    strokeWidth: 5,
    width:600,
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

// subTask creation function
const createSubtask = (data) => {
  let subTaskBg = new fabric.Rect({
    fill: guide.subTaskBg.fill,
    stroke: guide.subTaskBg.fill,
    strokeWidth: guide.subTaskBg.strokeWidth,
    width: guide.subTaskBg.width,
    height: guide.subTaskBg.height,
  });

  let subTaskHeading = new fabric.Rect({
    fill: guide.subTaskHeading.fill,
    width: subTaskBg.width - subTaskBg.strokeWidth,
    height: guide.subTaskHeading.height,
    originX: "left",
    originY: "top",
    strokeWidth: 0,
    top: subTaskBg.strokeWidth,
    left: subTaskBg.strokeWidth,
  });

  // creating socket array from createSocketsArr function, and turning them to a group
  let inputSocketsArr = createSocketsArr(guide,"input", data, true);
  let outputSocketsArr = createSocketsArr(guide,"output", data, false);
  const inputSocketGroup = new fabric.Group(inputSocketsArr, {});
  const outputSocketGroup = new fabric.Group(outputSocketsArr, {});

  // making subTaskHeight responsive to Sockets group's height 
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
    fontSize: guide.subTaskHeadingText.fontSize,
    fontWeight: guide.subTaskHeadingText.fontWeight,
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
    fill: guide.input.fill,
    originX: "left",
    originY: "top",
    top: subTaskBg.strokeWidth,
    left: subTaskBg.strokeWidth,
    strokeWidth: 0,
  });

  let output = new fabric.Rect({
    width: subTaskHeading.width / 2,
    height: subTaskBg.height - subTaskBg.strokeWidth,
    fill: guide.output.fill,
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

  // creating 'input/output' headings of the subTask
  const createInputHeading = (heading, width, top, left = 0) => {
    return new fabric.Textbox(heading, {
      fontSize: guide.inputHeading.fontSize,
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


  // adding all the elements of the subTask to a group
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
