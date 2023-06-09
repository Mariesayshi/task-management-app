let dataObj = [
  {
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
        parentProcess: "Orange",
        color: "#FF9033",
      },
    ],
    links: [],
    frontendOptions: {
      id: "1",
      positionInCanvas: [100, 200],
    },
  },
  {
    id: "2",
    name: "Task_2",
    sockets: [
      {
        id: "2.i1",
        name: "In_Socket_1",
        type: "File",
        io: "input",
        process:"someColor",
      },
      {
        id: "2.i2",
        name: "In_Socket_2",
        type: "String",
        io: "input",
        process: "Purple",
      },
      {
        id: "2.o1",
        name: "Out_Socket_1",
        type: "Integer",
        io: "output",
        process: "Cyan",
      },
      {
        id: "2.o2",
        name: "Out_Socket_2",
        type: "String",
        io: "output",
        process: "Pink",
      },
    ],
    processes: [
      {
        id: "Purple",
        parentProcess: null,
        color: "#BA00C6",
      },
      {
        id: "Yellow",
        parentProcess: "Purple",
        color: "#FFE400",
      },
      {
        id: "Cyan",
        parentProcess: "Purple",
        color: "#00FFF3",
      },
      {
        id: "Pink",
        parentProcess: "Cyan",
        color: "#FF00B2",
      },
    ],
    links: [],
    frontendOptions: {
      id: "1",
      positionInCanvas: [400, 200],
    },
  },
  {
    id: "3",
    name: "Task_3",
    sockets: [
      {
        id: "3.i1",
        name: "In_Socket_3.1",
        type: "File",
        io: "input",
        process: "DarkGreen",
      },
      {
        id: "3.i2",
        name: "In_Socket_3.2",
        type: "String",
        io: "output",
        process: "DarkGreen",
      },
    ],
    processes: [
      {
        id: "DarkGreen",
        parentProcess: null,
        color: "#006221",
      },
    ],
    links: [],
    frontendOptions: {
      id: "1",
      positionInCanvas: [0, -200],
    },
  },
];


export default dataObj;