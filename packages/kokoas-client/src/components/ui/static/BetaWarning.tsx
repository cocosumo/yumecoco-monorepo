import { Alert, Button } from '@mui/material';

export const BetaWarning = () => {
  return (
    <Alert 
      severity={'warning'}
      action={(
        <Button
          href={process.env.CW_CHATWORK_TICKET || ''}
          target='_blank'
          rel='noopener noreferrer'
          variant='outlined'
          color={'inherit'}
          size='small'
        >
          不具合報告
        </Button>
        )}
    >
      ご注意ください。見積作成はベター版です。不安定な機能がある可能性があります。
      不具合を発見した場合は、お手数ですが、管理者までご連絡ください。
    </Alert>
  );
};