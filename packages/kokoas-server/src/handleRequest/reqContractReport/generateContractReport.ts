import { createCanvas, loadImage } from 'canvas';
import { imageAssets } from 'config';

export const generateContractReport = async (contractId: string) => {

  const canvas = createCanvas(1276, 1790); // A4 size at DPI: 150
  const ctx = canvas.getContext('2d');

  const imageUrl = `${imageAssets}/ContractReport.png`;
  const frameImage = await loadImage(imageUrl);

  ctx.font = '30px Impact';
  ctx.drawImage(frameImage, 0, 0, 1276, 1790);

  // Draw line under text
  const text = ctx.measureText('Awesome!');
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + text.width, 102);
  ctx.stroke();

  
  console.log('imageUrl', imageUrl);



  
  return canvas.toDataURL('image/png');

};