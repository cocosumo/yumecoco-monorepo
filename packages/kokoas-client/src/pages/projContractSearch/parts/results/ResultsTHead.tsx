import { TableCellProps, TableHead } from '@mui/material';
import { grey } from '@mui/material/colors';
import { translations } from '../../../../helpers/translations';
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
        projDataId={translations.projId}
        estNum={translations.estNum}
        projName={translations.projName}
        store={translations.store}
        yumeAG={translations.yumeAG}
        cocoAG={translations.cocoAG}
        custName={translations.custName}
        contractDate={translations.contractDate}
        contractAmount={translations.contractAmount}
        latestInvoiceDate={translations.latestInvoiceDate}
        latestInvoiceAmount={translations.latestInvoiceAmount}
        plannedPaymentDate={translations.plannedPaymentDate}
        grossProfit={translations.grossProfit}
      />

    </TableHead>
  );
};