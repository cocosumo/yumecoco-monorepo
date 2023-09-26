import { TableBody, TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useContractsResult } from '../../../../hooks/useContractsResult';
import { useMemo } from 'react';

export const ProspectBody = () => {
  const { data } = useContractsResult();
  

  const {
    numOfProspectsBefore,
    amtOfProspectsBefore,

    numOfProspectsThisMonth,
    amtOfProspectsThisMonth,

    numOfProspectsNextMonth,
    amtOfProspectsNextMonth,
  } = useMemo(() => {
    const initialValues = {
      numOfProspectsThisMonth: 0,
      amtOfProspectsThisMonth: 0,

      numOfProspectsNextMonth: 0,
      amtOfProspectsNextMonth: 0,

      numOfProspectsBefore: 0,
      amtOfProspectsBefore: 0,
    };

    if (!data) {
      return initialValues;
    }

    return data.reduce((acc, cur) => {
      const {
        projectId,
      } = cur;

      if (!projectId.value) {
        return {
          ...acc,
          numOfProspectsBefore: acc.numOfProspectsBefore + 1,
          amtOfProspectsBefore: acc.amtOfProspectsBefore + (+cur.contractAmountIntax.value),
        };
      }

      return acc;

    }, initialValues);

    
  }, [data]);



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
          {numOfProspectsBefore}
          件
        </TableCell>
        <TableCell>
          {amtOfProspectsBefore.toLocaleString()}	
        </TableCell>

        <TableCell>
          {numOfProspectsThisMonth}
          件
        </TableCell>
        <TableCell>
          {amtOfProspectsThisMonth.toLocaleString()}
        </TableCell>

        <TableCell>
          {numOfProspectsNextMonth}
          件
        </TableCell>
        <TableCell>
          {amtOfProspectsNextMonth.toLocaleString()}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};