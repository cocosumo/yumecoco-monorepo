import { LinearProgress, Stack } from '@mui/material';
import { PayTable } from './paymentsTable/PayTable';
import { ActionButton } from '../common/ActionButton';
import { useDetailedAndpadOrderByProjId } from 'kokoas-client/src/hooksQuery';
import { EmptyBox } from 'kokoas-client/src/components';
import { Actions } from './actions/Actions';

export const PaymentDetails  = ({
  projId,
}:{
  projId: string,
}) => {

  const { data: andpadData, isLoading } = useDetailedAndpadOrderByProjId({
    projId,
    series: ['案件フロー'],
  });

  const {
    data,
  } = andpadData || {};

  const {
    システムID: systemId,   
  } = data?.object || {};



  return (
    <Stack 
      spacing={2}
      p={2}
      sx={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {isLoading  && (
      <LinearProgress />
      )}

      
      {!isLoading && !systemId && (
        <EmptyBox>
          Andpadと接続していないため、入金情報は取得出来ません。
        </EmptyBox>
      )}


      {!isLoading && systemId && (

        <>
          <Actions systemId={systemId} projId={projId} />
          <PayTable systemId={systemId} />
        </>

      )}


    </Stack>
  );
};