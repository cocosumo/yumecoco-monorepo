import { Alert, AlertTitle, Button } from '@mui/material';
import UnderConstruction from '../../UnderConstruction';

export const UnderDevelopmentAlert = () => {
 
  return (
    <>    
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
    </>

  );
};