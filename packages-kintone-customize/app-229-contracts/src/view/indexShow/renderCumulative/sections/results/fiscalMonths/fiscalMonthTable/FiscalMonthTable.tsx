import { Stack, Table, TableBody, TableHead, Typography } from '@mui/material';
import { ReactNode } from 'react';
import style from './FiscalMonthTable.module.css';
import { TableRowLayout } from './TableRowLayout';

export const FiscalMonthTable = ({
  title,
  records,
}:{
  title: ReactNode,
  records: DB.SavedRecord[]
}) => {


  return (
    <Stack spacing={2}>
      <Typography variant='h6'>
        {title}
      </Typography>
      <Table className={style.table}>
        <TableHead>
          <TableRowLayout 
            projType='工事種別'
            custName='発注者'
            projName='工事名'
            contractDate='契約日'
            contractAmtExclTax='契約金額（税抜）'
            contractAmtInclTax='契約金額（税込）'
            grossProfit='粗利'
            grossProfitRate='粗利率'
            agent='エージェント'
          />
        </TableHead>
        <TableBody>
          {records.map((record, index) => {
            const {
              $id,
              projTypeName,
              custName,
              projName,
              contractDate,
              contractAmountIntax: contractAmtInclTax,
              contractAmountNotax: contractAmtExclTax,
              profit: grossProfit,
              profitMargin: grossProfitRate,
              yumeAGName,
              yumeAGName2,
            } = record;

            const agents = [yumeAGName.value, yumeAGName2.value].filter(Boolean);

            return (
              <TableRowLayout
                key={$id.value}
                rowNum={index + 1}
                projType={projTypeName.value}
                custName={custName.value}
                projName={projName.value}
                contractDate={contractDate.value}
                contractAmtExclTax={contractAmtExclTax.value}
                contractAmtInclTax={contractAmtInclTax.value}
                grossProfit={grossProfit.value}
                grossProfitRate={grossProfitRate.value}
                agent={agents.length ?  agents.join('、 ') : 'ここすも'}
              />);
          })}
        </TableBody>
      </Table>
    </Stack>
  );
  
};