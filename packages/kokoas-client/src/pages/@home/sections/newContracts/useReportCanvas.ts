import { imageAssets } from 'config';
import { useContractById, useCustGroupById, useExternalImage, useProjById } from 'kokoas-client/src/hooksQuery';
import { useCallback, useState } from 'react';
import { getAgentNamesByType as custGetAgentNamesByType } from 'api-kintone/src/custgroups/helpers/getAgentNamesByType';
import { getAgentNamesByType as projAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';
 

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

export const useReportCanvas = (contractId: string) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  

  //const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    data: imageBase64,
    isLoading,
  } = useExternalImage({
    url: `${imageAssets}/ContractReport.png`,
    enabled: true,
  });

  const { 
    data: rectContract, 
  } = useContractById(contractId);

  const {
    data: recProj,
  } = useProjById(rectContract?.projId.value || '');

  const {
    data: recCust,
  } = useCustGroupById(recProj?.custGroupId.value || '');


  const ref = useCallback((canvasRef: HTMLCanvasElement) => {
    setIsGenerating(true);
    if (!rectContract || !recProj || !recCust) return;
    if (!imageBase64) return;

    const canvas = canvasRef as HTMLCanvasElement;

    if (!canvas) return;
    canvas.width = 1276;
    canvas.height = 1790;
    canvas.style.width = '340px';
    canvas.style.height = '100%';

    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    const {
      totalContractAmt,
      contractDate,
      deliveryDate,

      contractAmt,
      contractAmtDate,
    
      initialAmt,
      initialAmtDate,

      interimAmt,
      interimAmtDate,

      finalAmt,
      finalAmtDate,

      totalProfit,

      financingMethod,

      financialInstitution,
      financialInstitutionBranch,

      financialContactTel,
      financialContactFax,
    } = rectContract || {};

    const {
      agents,
      projTypeName,
    } = recProj || {};

    const {
      storeName,
      members,
      agents: custAgents,
    } = recCust || {};

    const cocoAGNames = projAgentNamesByType(agents, 'cocoAG') || custGetAgentNamesByType(custAgents, 'cocoAG');
    const yumeAGNames = projAgentNamesByType(agents, 'yumeAG') || custGetAgentNamesByType(custAgents, 'yumeAG');

    const custNames = members.value.map(({ value:{ customerName } }) => `${customerName.value} 様`).join('、');

    const image = new Image();
    image.onload = function () {
     
      console.log('Generating image...');
      ctx.drawImage(image, 0, 0);
      ctx.fillStyle = '#333333';
      ctx.textAlign = 'start';

      // ここすも担当者名
      ctx.font = '24px "Noto Sans JP"';
      ctx.fillText(cocoAGNames, 935, 480);

      // 契約者名
      ctx.font = '40px "Noto Sans JP"';
      ctx.textAlign = 'center';
      ctx.fillText(custNames, 620, 620);

      ctx.textAlign = 'start';
  
      if (contractDate.value) {
        // 契約日（月）
        const {
          month,
          day,
        } = parseDate(contractDate.value);
        ctx.fillText(month, 570, 712);
  
        // 契約日（日）
        ctx.fillText(day, 768, 712);
      }

      if (deliveryDate.value) {
        const {
          month,
          day,
        } = parseDate(deliveryDate.value);
        // 工事完了予定日(月)
        ctx.fillText(month, 570, 800);

        // 工事完了予定日(日)
        ctx.fillText(day, 768, 800);
      }

      ctx.fillText(storeName.value.replace('店', ''), 400, 888);
  
      ctx.font = '24px "Noto Sans JP"';
      ctx.fillText(yumeAGNames, 900, 888);

      ctx.font = '40px "Noto Sans JP"';
      ctx.fillText(projTypeName.value, 400, 976);

      ctx.font = '34px "Noto Sans JP"';
      ctx.fillText(totalContractAmt.value.toLocaleString(), 410, 1073);
      ctx.fillText(totalProfit.value.toLocaleString(), 880, 1073);

      ctx.font = '40px "Noto Sans JP"';
      ctx.fillStyle = '#3a87b9';
      ctx.fillText(financingMethod.value, 500, 1160);

      ctx.fillStyle = '#333333';
      ctx.font = '24px "Noto Sans JP"';
      ctx.fillText(financialInstitution.value, 350, 1240);
      ctx.fillText(financialInstitutionBranch.value, 820, 1240);
      ctx.fillText(financialContactTel.value, 450, 1340);
      ctx.fillText(financialContactFax.value, 820, 1340);

      ctx.font = '34px "Noto Sans JP"';
      if (contractAmt.value) {
        ctx.fillText(contractAmt.value.toLocaleString(), 875, 1433);
        const {
          month,
          day,
        } = parseDate(contractAmtDate.value);
  
        ctx.fillText(month, 583, 1433);
        ctx.fillText(day, 670, 1433 );
      }

      if (initialAmt.value) {
        ctx.fillText(initialAmt.value.toLocaleString(), 875, 1510);
        const {
          month,
          day,
        } = parseDate(initialAmtDate.value);

        ctx.fillText(month, 583, 1510);
        ctx.fillText(day, 670, 1510 );
      }

      if (interimAmt.value) {
        ctx.fillText(interimAmt.value.toLocaleString(), 875, 1584);
        const {
          month,
          day,
        } = parseDate(interimAmtDate.value);
    
        ctx.fillText(month, 583, 1584);
        ctx.fillText(day, 670, 1584);
      }

      if (finalAmt.value) {
        ctx.fillText(finalAmt.value.toLocaleString(), 875, 1660);
        const {
          month,
          day,
        } = parseDate(finalAmtDate.value);

        ctx.fillText(month, 583, 1660);
        ctx.fillText(day, 670, 1660);
      }
  
      
      setDataUrl(canvas.toDataURL('image/png'));
      setIsGenerating(false);
    };
    image.src = `data:image/png;base64,${imageBase64}`;

  }, 
  [
    imageBase64,
    rectContract,
    recProj,
    recCust,
  ]);

  return {
    isLoading,
    isGenerating,
    canvasRef: ref,
    imageBase64,
    dataUrl,
  };
};