import { PageTitle3 } from 'kokoas-client/src/components';
import {  Alert, AlertTitle, Button, Stack } from '@mui/material';
import UnderConstruction from '../UnderConstruction';


export const FormOrder = () => {
 

  const isEdit = false;

  return (
    <Stack spacing={2}>
      <PageTitle3 
        label={`発注${isEdit ? '編集' : '登録'}`}
      />
      <Alert 
        severity='warning'
      >
        <AlertTitle>
          お知らせ
        </AlertTitle>
        当機能は現在開発中です。提案や要望があればお知らせください。
        最新の進捗状況は
        <Button
          href='https://github.com/orgs/cocosumo/projects/8/views/8'
          target='_blank'
        >
          こちら
        </Button>
        からご確認ください。
      </Alert>
      <UnderConstruction />
        
    </Stack>

  );
};