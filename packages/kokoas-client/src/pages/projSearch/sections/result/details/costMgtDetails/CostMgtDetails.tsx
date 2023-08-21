import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { useAndpadCostMgtDataByProjId, useAndpadOrderByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { Summary } from './Summary';
import { Purchases } from './purchases/Purchases';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { EmptyBox } from 'kokoas-client/src/components';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';

export const CostMgtDetails = ({
  projId,
}:{
  projId: string
}) => {

  const { 
    data,
    isLoading, 
  } = useAndpadCostMgtDataByProjId(projId);

  const { data: projRec } = useProjById(projId);
  const { data: andpadRec } = useAndpadOrderByProjId(projId);

  const navigate = useNavigateWithQuery();

  const parsedSystemId = projRec?.forceLinkedAndpadSystemId.value || String(andpadRec?.システムID || '');

  console.log('parsedSystemId', parsedSystemId);
  
  return (
    <Stack
      spacing={2}
      p={2}
      width={'100%'}
      height={'100%'}
      overflow='auto'
    >
      <Alert severity='info'>
        <AlertTitle>
          試験中です
        </AlertTitle> 
        要望などありましたら、西ー小出、東ー林 まで連絡お願いします。
      </Alert>
      {isLoading && (
        <Loading />
      )}

      {!isLoading && !parsedSystemId && (
        <EmptyBox>
          Andpadに接続されていません。接続する場合は、
          <Button 
            onClick={() => navigate('projEditV2', {
              projId,
            })}
          >
            こちら
          </Button>
          をクリックしてください。

        </EmptyBox>
      )}
      {!isLoading && parsedSystemId && !data && (
        <EmptyBox>
          <Typography>
            Andpadにデータがありません。
          </Typography>
          <Button
            href={`https://andpad.jp/manager/my/orders/${parsedSystemId}/contract_orders`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Andpadで確認する
          </Button>
        </EmptyBox>
      )}
      {data && (
        <>
          <Summary 
            costMgtData={data}
            systemId={parsedSystemId}
          />
          <Purchases 
            costMgtData={data}
          />
        
        </>

      )}
      

    </Stack>
  );
};