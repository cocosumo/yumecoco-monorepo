import { IconButton, LinearProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import {  useLatestCompletedContracts } from 'kokoas-client/src/hooksQuery';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { grey } from '@mui/material/colors';
import { CocoAgent } from './CocoAgent';


export const NewContractsTable = () => {

  const { 
    data, 
    isLoading,
  } = useLatestCompletedContracts();

  if (isLoading) {
    return <LinearProgress />;
  }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">

        <TableBody>
          {data?.map(({
            contractDate,
            storeName,
            projName,
            projId,
            totalContractAmt,
            uuid,
          }) => {
            
            return (
              <TableRow
                key={uuid.value}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell 
                  width={100}
                  sx={{
                    color: grey[600],
                    fontWeight: 'bold',
                  }}
                >
                  {contractDate.value}
                </TableCell>
                <TableCell 
                  width={100}
                  sx={{
                    color: grey[600],
                    fontWeight: 'bold',
                  }}
                >
                  <Stack>          
                    {storeName.value}
                    <CocoAgent 
                      projId={projId.value}
                    />
                  </Stack>
                </TableCell>
                <TableCell 
                  sx={{
                    fontSize: 18,
                    color: grey[600],
                    fontWeight: 'bold',
                    // truncate text with ellipsis
                    maxWidth: 300,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {projName.value}
    
                </TableCell>

                <TableCell sx={{
                  color: grey[400],
                }} align='right'
                >
                  {`${(+totalContractAmt.value).toLocaleString()} 円`}
                </TableCell>

                <TableCell width={'auto'} align='right'>
                  <IconButton>
                    <CardGiftcardIcon />
                  </IconButton>
                </TableCell>

      
              </TableRow>
            );
          })}
        </TableBody>
      </Table>


    </TableContainer>
  );
 
};