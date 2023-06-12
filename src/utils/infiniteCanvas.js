const addInfiniteCanvasListeners = (canvas) => {
  canvas.on("selection:created", () => {
    let active = canvas.getActiveObject();
    active.hasControls = false;
  });

  canvas.on("mouse:down", (opt) => {
    if (canvas.selection || opt.target) {
      canvas.isDragging = false;
    } else {
      let evt = opt.e;
      canvas.isDragging = true;
      canvas.lastPosX = evt.clientX;
      canvas.lastPosY = evt.clientY;
    }
  });

  canvas.on("mouse:move", (opt) => {
    if (canvas.isDragging && !canvas.selection) {
      let e = opt.e;
      let vpt = canvas.viewportTransform;
      vpt[4] += e.clientX - canvas.lastPosX;
      vpt[5] += e.clientY - canvas.lastPosY;
      canvas.requestRenderAll();
      canvas.lastPosX = e.clientX;
      canvas.lastPosY = e.clientY;
    }
  });

  canvas.on("mouse:up", () => {
    canvas.setViewportTransform(canvas.viewportTransform);
    canvas.isDragging = false;
  });

  canvas.on("mouse:wheel", (opt) => {
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 5) zoom = 5;
    if (zoom < 0.3) zoom = 0.3;

    if (zoom < 0.5) {
      canvas.set({ imageSmoothingEnabled: false });
    } else {
      canvas.set({ imageSmoothingEnabled: true });
    }
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
};

export default addInfiniteCanvasListeners;
