import { TableCellProps, TableHead } from '@mui/material';
import { grey } from '@mui/material/colors';
import { translations } from 'kokoas-client/src/helpers/translations';
import { ResultsTHeadSortLabel } from './ResultsTHeadSortLabel';
import { TRowLayout } from './TRowLayout';

export const headCells = [
  ['projId', 'projEstimateId'],
  ['projName', 'projType'],
  ['store', 'yumeAG', 'cocoAG'],
  ['custName', 'contractDate'],
  ['contractAmount', 'grossProfit'],
] as const;

export const getAlign = (idx: number): TableCellProps['align'] => {
  switch (idx) {
    case 4:
      return 'right';
    default:
      return 'left';
  }
};

export const ResultsTHead = () => {

  return (
    <TableHead
      sx={{
        '& th ': {
          top: 60, // offset below the appbar
          borderBottom: 4,
          borderColor: grey[200],
        },
      }}
    >
      <TRowLayout
        projDataId={translations.projDataId}
        estNum={<ResultsTHeadSortLabel headerLabel='estimateDataId' />}
        projName={<ResultsTHeadSortLabel headerLabel='projName' />}
        store={<ResultsTHeadSortLabel headerLabel='store' />}
        yumeAG={<ResultsTHeadSortLabel headerLabel='yumeAG' />}
        cocoAG={<ResultsTHeadSortLabel headerLabel='cocoAG' />}
        custName={<ResultsTHeadSortLabel headerLabel='custName' />}
        contractDate={<ResultsTHeadSortLabel headerLabel='contractDate' />}
        contractAmount={<ResultsTHeadSortLabel headerLabel='contractAmount' />}
        latestInvoiceDate={<ResultsTHeadSortLabel headerLabel='latestInvoiceDate' />}
        latestInvoiceAmount={<ResultsTHeadSortLabel headerLabel='latestInvoiceAmount' />}
        plannedPaymentDate={<ResultsTHeadSortLabel headerLabel='plannedPaymentDate' />}
        grossProfit={<ResultsTHeadSortLabel headerLabel='grossProfit' />}
      />

    </TableHead>
  );
};