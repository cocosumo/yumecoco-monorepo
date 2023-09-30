import { TableBody, TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useContractsResult } from '../../../../hooks/useContractsResult';
import { useMemo } from 'react';
import { useFilteredProjects } from '../../../../hooks/useFilteredProjects';
import { useTotalResult } from '../../../../hooks/useTotalResult';
import { roundTo } from 'libs';
import { ProspectsNextMonthContent } from './ProspectsNextMonthContent';

/**
 * 当月反響
 * * 作成日と契約日の月が一緒
 * 
 * 前月反響
 * * (実績 - 当月反響)
 * 
 * 来月見込み
 * * 次月と見込み案件の「契約予定日」の月が一緒、もしくは「契約予定日」が空。
 * * 引っ張るのは「契約予定金額」
 * 
 */
export const ProspectBody = () => {
  const { data: contracts } = useContractsResult();
  const { data: projects } = useFilteredProjects();
  const { data: totalResult } = useTotalResult();

  const {
    totalAmtExclTax = 0,
    totalNumOfContracts = 0,
  } = totalResult || {};
  

  const {

    numOfProspectsThisMonth,
    amtOfProspectsThisMonth,

  } = useMemo(() => {
    const initialValues = {
      numOfProspectsThisMonth: 0,
      amtOfProspectsThisMonth: 0,

    };

    if (!contracts) {
      return initialValues;
    }

    return contracts.reduce((acc, cur) => {
      const {
        projectId: fkProjId,
      } = cur;

      if (fkProjId.value) {
        const isContratThisMonth = projects?.some(({
          uuid: projId,

        }) => {

          return projId.value === fkProjId.value;
        });


        if (isContratThisMonth) {
          return {
            ...acc,
            numOfProspectsThisMonth: acc.numOfProspectsThisMonth + 1,
            amtOfProspectsThisMonth: acc.amtOfProspectsThisMonth + (+cur.contractAmountIntax.value),
          };
        } 

      }

      return acc;
      
    }, initialValues);

    
  }, [
    contracts, 
    projects,
  ]);

  const numOfProspectsBefore = totalNumOfContracts - numOfProspectsThisMonth;
  const amtOfProspectsBefore = totalAmtExclTax - amtOfProspectsThisMonth ;

  return (
    <TableBody 
      sx={{
        //convert above to nth-of-type
        '& td:nth-of-type(2n):not(:last-of-type)': {
          borderRight: '4px double',
          borderColor: grey[300],

        },

        '& td:nth-of-type(2n+1)': {
          borderRight: '1px solid',
          borderColor: grey[300],

        },
        '& td':{
          textAlign: 'center',
        },
        
      }}
    >
      <TableRow>
        <TableCell>
          {numOfProspectsBefore.toLocaleString()}
          件
        </TableCell>
        <TableCell>
          {roundTo(amtOfProspectsBefore).toLocaleString()}	
        </TableCell>

        <TableCell>
          {numOfProspectsThisMonth}
          件
        </TableCell>
        <TableCell>
          {amtOfProspectsThisMonth.toLocaleString()}
        </TableCell>

        <ProspectsNextMonthContent />
      </TableRow>
    </TableBody>
  );
};