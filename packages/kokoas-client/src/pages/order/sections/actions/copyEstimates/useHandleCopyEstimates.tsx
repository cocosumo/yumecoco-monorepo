import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';
import { UseEstimateByProjIdReturn } from 'kokoas-client/src/hooksQuery';
import { ReactNode } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { pages } from 'kokoas-client/src/pages/Router';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { TItem } from '../../../schema';
import { roundTo } from 'libs';
import { initialRow } from '../../../form';
import { produce } from 'immer';

const Info = ({
  title,
  value,
}:{
  title: string,
  value: ReactNode,
}) => {

  return (
    <Stack direction={'row'} spacing={2}>
      <Box width={100}>
        {title}
      </Box>
      <Box>
        {value}
      </Box>
    </Stack>
  );
};

export const useHandleCopyEstimates = () => {
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();
  const { getValues, setValue } = useTypedFormContext();
  
  const handleCopyEstimates = ({
    summary,
    record,
  }:{
    summary: UseEstimateByProjIdReturn['calculated'][number]['summary'],
    record: UseEstimateByProjIdReturn['records'][number],
  }) => {
    setDialogState({
      open: true,
      title: '見積を引用しますか？',
      content: ((
        <Stack spacing={2}>
          <Typography>
            見積の内容が追加でコピーされます。
          </Typography>
          <Stack 
            spacing={1} 
            bgcolor={grey[50]} 
            borderRadius={4}
            p={2}
          >
            <Info 
              title={'枝番'} 
              value={(
                <Tooltip 
                  title={'見積を別タブで開く'}
                  placement='top'
                >
                  <Button 
                    size='small'
                    endIcon={<OpenInNewIcon />}
                    variant={'outlined'}
                    color='secondary'
                    href={`#${pages.projEstimate}?projEstimateId=${record.uuid.value}`}
                    target='_blank'

                  >
                    {record.dataId.value.slice(-2)}
                  </Button>
                </Tooltip>)}
            />
            <Info title={'作成日'} value={format(parseISO(record.作成日時.value), 'yyyy/MM/dd HH:mm')} />
            <Info title={'区分'} value={record.estimateStatus.value || '-'} />
            <Info title={'原価金額'} value={`${summary.totalCostPrice.toLocaleString()} 円`} />
            <Info title={'見積税抜金額'} value={`${summary.totalAmountBeforeTax.toLocaleString()} 円`} />
            <Info title={'見積税込金額'} value={`${summary.totalAmountAfterTax.toLocaleString()} 円`} />
          </Stack>
        </Stack>
      )),
      handleYes: () => {
        const { 内訳: estimateItems } = record;
        const items = getValues('items');

        const copiedItems = estimateItems.value.map<TItem>(({ value: estRow }) => {

          return ({
            majorItem: estRow.大項目.value,
            middleItem: estRow.中項目.value,
            material: estRow.部材名.value,
            quantity: +estRow.数量.value,
            unit: estRow.単位.value,
            costPrice: +estRow.原価.value,
            rowCostPriceBeforeTax: roundTo(+estRow.原価.value * +estRow.数量.value),
            taxRate: initialRow.taxRate,
            rowRemarks: estRow.備考.value,
          });
        });


        const combinedItems = produce(items, draft => {
          draft.push(...copiedItems);
        });

        setValue('items', combinedItems);
        setSnackState({
          open: true,
          severity: 'success',
          message: '見積をコピーしました。',
        });

      },
    });
  };

  return {
    handleCopyEstimates,
  };

};