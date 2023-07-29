/* import { createCanvas, loadImage } from 'canvas';
import { imageAssets } from 'config';
import { getContractReportData } from './getContractReportData';


const parseDate = (date: string) => {
  if (!date) return {
    year: '',
    month: '',
    day: '',
  };
  
  const [year, month, day] = date.split('-').map((str) => String(+str));
  return {
    year,
    month,
    day,
  };
};

export const generateContractReport = async (contractId: string) => {

  const {
    cocoAGNames,
    custNames,
    contractDate,
    deliveryDate,
    storeName,

    projTypeName,
    totalContractAmt,
    totalProfit,

    financingMethod,
    financialInstitution,
    financialInstitutionBranch,
    financialContactTel,
    financialContactFax,

    yumeAGNames,
    
    contractAmt,
    contractAmtDate,

    initialAmt,
    initialAmtDate,

    interimAmt,
    interimAmtDate,

    finalAmt,
    finalAmtDate,
  } = await getContractReportData(contractId);

  const canvas = createCanvas(1276, 1790); // A4 size at DPI: 150
  const ctx = canvas.getContext('2d');

  const imageUrl = `${imageAssets}/ContractReport.png`;
  const frameImage = await loadImage(imageUrl);

  ctx.drawImage(frameImage, 0, 0, 1276, 1790);

  // ここすも担当者名
  ctx.font = '24px "Noto Sans JP"';
  ctx.fillText(cocoAGNames, 940, 480);
  ctx.fillStyle = '#333333';

  // 契約者名
  ctx.font = '40px "Noto Sans JP"';
  ctx.fillText(custNames, 370, 630);

  console.log('contractDate', deliveryDate, contractDate);


  if (contractDate) {
    // 契約日（月）
    const {
      month,
      day,
    } = parseDate(contractDate);
    ctx.fillText(month, 570, 712);
  
    // 契約日（日）
    ctx.fillText(day, 768, 712);
  }

  if (deliveryDate) {
    const {
      month,
      day,
    } = parseDate(deliveryDate);
    // 工事完了予定日(月)
    ctx.fillText(month, 570, 800);

    // 工事完了予定日(日)
    ctx.fillText(day, 768, 800);
  }
  
  ctx.fillText(storeName.replace('店', ''), 400, 888);
  
  ctx.font = '24px "Noto Sans JP"';
  ctx.fillText(yumeAGNames, 900, 888);

  ctx.font = '40px "Noto Sans JP"';
  ctx.fillText(projTypeName, 400, 976);

  ctx.font = '34px "Noto Sans JP"';
  ctx.fillText(totalContractAmt.toLocaleString(), 410, 1073);
  ctx.fillText(totalProfit.toLocaleString(), 880, 1073);

  ctx.font = '40px "Noto Sans JP"';
  ctx.fillStyle = '#3a87b9';
  ctx.fillText(financingMethod, 500, 1160);

  ctx.fillStyle = '#333333';
  ctx.font = '24px "Noto Sans JP"';
  ctx.fillText(financialInstitution, 350, 1240);
  ctx.fillText(financialInstitutionBranch, 820, 1240);
  ctx.fillText(financialContactTel, 450, 1340);
  ctx.fillText(financialContactFax, 820, 1340);

  ctx.font = '34px "Noto Sans JP"';
  if (contractAmt) {
    ctx.fillText(contractAmt.toLocaleString(), 875, 1433);
    const {
      month,
      day,
    } = parseDate(contractAmtDate);
  
    ctx.fillText(month, 583, 1433);
    ctx.fillText(day, 670, 1433 );
  }

  if (initialAmt) {
    ctx.fillText(initialAmt.toLocaleString(), 875, 1510);
    const {
      month,
      day,
    } = parseDate(initialAmtDate);

    ctx.fillText(month, 583, 1510);
    ctx.fillText(day, 670, 1510 );
  }

  if (interimAmt) {
    ctx.fillText(interimAmt.toLocaleString(), 875, 1584);
    const {
      month,
      day,
    } = parseDate(interimAmtDate);
    
    ctx.fillText(month, 583, 1584);
    ctx.fillText(day, 670, 1584);
  }

  if (finalAmt) {
    ctx.fillText(finalAmt.toLocaleString(), 875, 1660);
    const {
      month,
      day,
    } = parseDate(finalAmtDate);

    ctx.fillText(month, 583, 1660);
    ctx.fillText(day, 670, 1660);
  }


  return canvas.toDataURL('image/png');

}; */