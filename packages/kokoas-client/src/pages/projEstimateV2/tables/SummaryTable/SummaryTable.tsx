import { TableHead, TableRow } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { SummaryTableContainer } from './SummaryTableContainer';
import { SummaryContentsContainer } from './SummaryTBodyContainer';
import { TabelCellNumber } from './TabelCellNumber';

const summaryNameList = [
  '原価合計', '粗利', '粗利率', '税(円)', '税抜金額', '税込金額',
] as const;


export default function SummaryTable() {

  const [
    totalCostPrice,
    totalAmountBeforeTax,
    totalAmountAfterTax,
  ] = useWatch<TypeOfForm>({
    name: [
      'totalCostPrice',
      'totalAmountBeforeTax',
      'totalAmountAfterTax',
    ],
  });

  return (
    <SummaryTableContainer >
      <TableHead>
        <TableRow sx={{
          '& th': {
            whiteSpace: 'nowrap',
          },
        }}
        >
          {summaryNameList.map((item) => {
            return (
              <TabelCellNumber key={item} >
                {item}
              </TabelCellNumber>
            );
          })}
        </TableRow>
      </TableHead>
      <SummaryContentsContainer>
        <TabelCellNumber>
          {Math.round(+(totalCostPrice ?? 0 ) as number).toLocaleString() + '円'}
        </TabelCellNumber>
        {/* <TabelCellNumber>
            {Math.round(grossProfitVal).toLocaleString() + '円'}
          </TabelCellNumber>
          <TabelCellNumber>
            {Math.round(grossProfitRate).toLocaleString() + '%'}
          </TabelCellNumber>*/}
        <TabelCellNumber>
          {Math.round((totalAmountAfterTax as number) - (totalAmountBeforeTax as number)).toLocaleString() + '円'}
        </TabelCellNumber>
        <TabelCellNumber>
          {Math.round((totalAmountBeforeTax ?? 0) as number).toLocaleString() + '円'}
        </TabelCellNumber>


        <TabelCellNumber
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          {Math.round((totalAmountAfterTax ?? 0 ) as number).toLocaleString() + '円'}
        </TabelCellNumber>
      </SummaryContentsContainer>
    </SummaryTableContainer>
  );
}