import { Box, Chip, Stack, Tooltip } from '@mui/material';
import { IInvoices } from 'types';
import { format, parseISO } from 'date-fns';
import { TInvoiceStatus } from '../../form';
import { Caption } from 'kokoas-client/src/components';
import { ButtonContentDataId } from './ButtonContentDataId';
import { ReactNode } from 'react';
import { ButtonContentBillingAmount } from './ButtonContentBillingAmount';


export type DataIds = {
  dataId: string,
  billingAmount: string,
};

type InvStatusJa = {
  [key in TInvoiceStatus]: string;
};

const invoiceStatusJa: InvStatusJa = {
  'created': '作成済',
  'sent': '発行済',
  'voided': '破棄',
  'completed': '完了',
  '': '',
};



export const ListItemInvoices = ({
  invoiceRecord,
}: {
  invoiceRecord: IInvoices
}) => {

  const {
    slipNumber: { value: slipNumber },
    invoiceStatus: { value: invoiceStatus },
    issuedDateTime: { value: dateCreated },
    billingAmount: { value: billingAmount },
    estimateLists: { value: estimateLists },
    uuid: { value: estimateId },
  } = invoiceRecord;

  const dataIds: DataIds[] = estimateLists.map(({ value }) => {
    return ({
      dataId: value.dataId.value,
      billingAmount: value.amountPerContract.value,
    });
  });

  const infoToolTip: ReactNode = (
    <Box width={'30%'}>
      {dataIds.map((dataId) => {
        return (
          <Caption
            text={`見積もり枝番：${dataId.dataId} 請求金額：${dataId.billingAmount}`}
            key={`${dataId.dataId}tooltipInfo`}
          />);
      })}
    </Box>);


  return (
    <Tooltip title={infoToolTip} key={`${estimateId}tooltip`}>
      <>
        <Stack
          direction={'column'}
          spacing={2}
          alignItems="flex-start"
          justifyContent="flex-start"
          width={'50%'}
        >
          <Stack
            direction={'row'}
            spacing={0}
            alignItems="flex-end"
            justifyContent="flex-start"
            width={'100%'}
          >

            {!!invoiceStatus &&
              <Box width={'30%'}>
                <Chip
                  label={invoiceStatusJa[invoiceStatus as TInvoiceStatus]}
                  color={'info'}
                  size={'small'}
                />
              </Box>}

            {!!slipNumber &&
              <Box width={'70%'}>
                <Caption text={`伝票番号：${slipNumber}`} />
              </Box>}
          </Stack>

          <ButtonContentDataId estimateLists={dataIds} />

        </Stack>


        <Stack
          direction={'column'}
          spacing={2}
          alignItems="flex-end"
          justifyContent="space-around"
          width={'50%'}
        >
          <Caption text={`作成日：${format(parseISO(dateCreated), 'yyyy/MM/dd')}`} />

          <ButtonContentBillingAmount billingAmount={billingAmount} />

        </Stack>
      </>
    </Tooltip>
  );
};

