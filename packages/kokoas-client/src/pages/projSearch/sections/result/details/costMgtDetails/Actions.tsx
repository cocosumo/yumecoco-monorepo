import { Button, Stack } from '@mui/material';
import { getCostMgtExcelByData } from 'kokoas-client/src/api';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useCallback } from 'react';
import { GetCostMgtData } from 'types';

export const Actions = ({
  systemId,
  costMgtData,
}:{
  systemId: string,
  costMgtData: GetCostMgtData,
}) => {

  const { setSnackState } = useSnackBar();

  const handleDownloadExcel = useCallback(async () => {

    try {
    // Do we need to cache this?
      const result = await getCostMgtExcelByData(costMgtData);
      if ('fileB64' in result) {
        const {
          fileName,
          fileB64,
        } = result;

        // download file on client side
        const link = document.createElement('a');
        link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileB64}`;
        link.download = fileName;
        link.click();
        
      } else {
        throw new Error('アクションは成功しましたが、ファイルが見つかりませんでした。');
      }
    } catch (e) {

      setSnackState({
        open: true,
        message: `エクセル出力が失敗しました。${e.message}`,
        severity: 'error',
      });
    }
   

  }, [costMgtData, setSnackState]);


  return (
    <Stack
      spacing={1}
      minWidth={200}
    >
      <Button
        size='small'
        variant='outlined'
        onClick={handleDownloadExcel}
      >
        出力
      </Button>
      {systemId && (
      <Button
        size='small'
        variant='outlined'
          // 固定、テスト用
        href={`https://budget.andpad.jp/orders/${systemId}/contract_order_payments/`}
        target={'_blank'}
      >
        Andpadで開く
      </Button>
      )}

    </Stack>

  );
};