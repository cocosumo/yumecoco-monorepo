export const resizeText = (
  canvas: CanvasRenderingContext2D,
  txt: string, 
  maxWidth: number, 
  fontSize: number,
) => {
  // canvas created in constructor
  // this.canvas = document.createElement("canvas").getContext("2d");
  canvas.font = `${fontSize}px Arial`;
  const minFontSize = 10;
  let width = canvas.measureText(txt).width;
  if (width > maxWidth) {
    let newfontSize = fontSize;
    let decrement = 1;
    let newWidth;
    while (width > maxWidth) {
      newfontSize -= decrement;
      if (newfontSize < minFontSize) { 
        return { fontSize: `${minFontSize}px` }; 
      }
      canvas.font = `${newfontSize}px Arial`;
      newWidth = canvas.measureText(txt).width;
      if (newWidth < maxWidth && decrement === 1) {
        decrement = 0.1;
        newfontSize += 1;
      } else {
        width = newWidth;
      }
    }
    return { fontSize: `${newfontSize}px` };
  } else {
    return { fontSize: `${fontSize}px` };
  }
};