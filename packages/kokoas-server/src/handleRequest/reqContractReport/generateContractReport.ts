import { createCanvas, loadImage } from 'canvas';
import { imageAssets } from 'config';
import { getContractReportData } from './getContractReportData';

export const generateContractReport = async (contractId: string) => {

  const {
    cocoAGNames,
    custNames,
    contractDate,
    deliveryDate,
  } = await getContractReportData(contractId);

  const canvas = createCanvas(1276, 1790); // A4 size at DPI: 150
  const ctx = canvas.getContext('2d');

  const imageUrl = `${imageAssets}/ContractReport.png`;
  const frameImage = await loadImage(imageUrl);

  ctx.drawImage(frameImage, 0, 0, 1276, 1790);

  // 担当者名
  ctx.font = '24px "Noto Sans JP"';
  ctx.fillText(cocoAGNames, 940, 480);

  // 契約者名
  ctx.font = '40px "Noto Sans JP"';
  ctx.fillText(custNames, 370, 630);

  if (contractDate) {
    // 契約日（月）
    ctx.font = '40px "Noto Sans JP"';
    ctx.fillText(contractDate.split('-')?.[1].replace('0', ''), 570, 712);
  
    // 契約日（日）
    ctx.fillText(contractDate.split('-')?.[2].replace('0', ''), 768, 712);
  }

  // 工事完了予定日(月)
  ctx.fillText(deliveryDate?.split('-')?.[1].replace('0', '') || '', 570, 790);
  

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