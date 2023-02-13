import { DialogContent, DialogContentText } from '@mui/material';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../../form';
import { ContractItem } from './ContractItem';

export const SaveToAndpadDialogContent = () => {
  const { projId } = useURLParams<TypeOfForm>();
  const { data: estimates } = useEstimatesByProjId(projId);

  console.log(estimates);


  return (
    <DialogContent>
      <DialogContentText>
        案件を選択してください。すでに登録しているなら、更新されます。
      </DialogContentText>
      {
        estimates?.calculated.map(({ summary }, idx) => {
          const {
            totalAmountAfterTax,
            totalProfit,
            overallProfitRate,
          } = summary;
          const {
            uuid,
            dataId,
          } = estimates.records[idx];
          return (
            <ContractItem
              key={uuid.value}
              dataId={dataId.value}
              totalAmountAfterTax={totalAmountAfterTax}
              totalProfit={totalProfit}
              overallProfitRate={overallProfitRate}
              selected={false}
            />);
        })
      }
    </DialogContent>
  );
};