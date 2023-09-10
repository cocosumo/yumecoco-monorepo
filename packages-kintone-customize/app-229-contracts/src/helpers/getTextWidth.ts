export function getTextWidth(text: string, fontSize = 16) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    return 0;
  }
  
  context.font = `${fontSize}pt sans-serif`;

  return context.measureText(text).width;
}