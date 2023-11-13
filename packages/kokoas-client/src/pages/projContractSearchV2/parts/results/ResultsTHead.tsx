import { TableCellProps, TableHead } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ResultsTHeadSortLabel } from './ResultsTHeadSortLabel';
import { TRowLayout } from './TRowLayout';


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
        contractStatus={<ResultsTHeadSortLabel headerLabel='contractStatus' />}
        projDataId={<ResultsTHeadSortLabel headerLabel='projDataId' />}
        projName={<ResultsTHeadSortLabel headerLabel='projName' />}
        store={<ResultsTHeadSortLabel headerLabel='store' />}
        yumeAG={<ResultsTHeadSortLabel headerLabel='yumeAG' />}
        cocoAG={<ResultsTHeadSortLabel headerLabel='cocoAG' />}
        cocoConst={<ResultsTHeadSortLabel headerLabel='cocoConst' />}
        custName={<ResultsTHeadSortLabel headerLabel='custName' />}
        contractDate={<ResultsTHeadSortLabel headerLabel='contractDate' />}
        contractAmount={<ResultsTHeadSortLabel headerLabel='contractAmount' />}
        grossProfit={<ResultsTHeadSortLabel headerLabel='grossProfit' />}
        profitRate={<ResultsTHeadSortLabel headerLabel='profitRate' />}
        createdAt={<ResultsTHeadSortLabel headerLabel='createdAt' />}
        updatedAt={<ResultsTHeadSortLabel headerLabel='updatedAt' />}
        signMethod={<ResultsTHeadSortLabel headerLabel='signMethod' />}
        category={<ResultsTHeadSortLabel headerLabel='category' />}
        refundAmt={<ResultsTHeadSortLabel headerLabel='refundAmt' />}
        reductionAmt={<ResultsTHeadSortLabel headerLabel='reductionAmt' />}
        subsidyAmt={<ResultsTHeadSortLabel headerLabel='subsidyAmt' />}

      />

    </TableHead>
  );
};