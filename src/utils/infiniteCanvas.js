const addInfiniteCanvasListeners = (canvas) => { 

  
  
    canvas.on("selection:created", () => {
        let active = canvas.getActiveObject();
        active.hasControls = false;
      });
  
      canvas.on("mouse:down", (opt)=>  {
        var evt = opt.e;
        canvas.isDragging = true;
        canvas.selection = true;
        canvas.lastPosX = evt.clientX;
        canvas.lastPosY = evt.clientY;
      });
      canvas.on("mouse:move",  (opt) => {
        if (canvas.isDragging && opt.e.ctrlKey === true) {
          var e = opt.e;
          canvas.selection = false;
          var vpt = canvas.viewportTransform;
          vpt[4] += e.clientX - canvas.lastPosX;
          vpt[5] += e.clientY - canvas.lastPosY;
          canvas.requestRenderAll();
          canvas.lastPosX = e.clientX;
          canvas.lastPosY = e.clientY;
        }
      });
      canvas.on("mouse:up",  () => {
        canvas.setViewportTransform(canvas.viewportTransform);
        canvas.isDragging = false;
        // canvas.selection = true;
      });
  
      canvas.on("mouse:wheel",  (opt) => {
        var delta = opt.e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 5) zoom = 5;
        if (zoom < 0.3) zoom = 0.3;
        if (zoom < 0.5) {
          canvas.set({ imageSmoothingEnabled: false });
        }else{
          canvas.set({ imageSmoothingEnabled: true });

        }
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

    //   canvas.on("selection:created", () => {
    //     let active = canvas.getActiveObject();
    //     active.hasControls = false;
    //   });
  
    //   canvas.on("mouse:down", (opt)=>  {
    //     var evt = opt.e;
    //     this.isDragging = true;
    //     this.selection = true;
    //     this.lastPosX = evt.clientX;
    //     this.lastPosY = evt.clientY;
    //   });
    //   canvas.on("mouse:move",  (opt) => {
    //     if (this.isDragging && opt.e.ctrlKey === true) {
    //       var e = opt.e;
    //       this.selection = false;
    //       var vpt = this.viewportTransform;
    //       vpt[4] += e.clientX - this.lastPosX;
    //       vpt[5] += e.clientY - this.lastPosY;
    //       this.requestRenderAll();
    //       this.lastPosX = e.clientX;
    //       this.lastPosY = e.clientY;
    //     }
    //   });
    //   canvas.on("mouse:up",  () => {
    //     this.setViewportTransform(this.viewportTransform);
    //     this.isDragging = false;
    //     // this.selection = true;
    //   });
  
    //   canvas.on("mouse:wheel",  (opt) => {
    //     var delta = opt.e.deltaY;
    //     var zoom = canvas.getZoom();
    //     zoom *= 0.999 ** delta;
    //     if (zoom > 5) zoom = 5;
    //     if (zoom < 0.1) zoom = 0.1;
    //     if (zoom < 0.5) {
    //       canvas.set({ imageSmoothingEnabled: false });
    //     }
    //     canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //     opt.e.preventDefault();
    //     opt.e.stopPropagation();
    //   });
}

export default addInfiniteCanvasListeners;