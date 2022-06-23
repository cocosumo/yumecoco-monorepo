import { Button, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { PageSubTitle } from '../../../../components/ui/labels';
import { RecordStatus } from '../../../../config/formValues';
import { useConfirmDialog } from '../../../../hooks';

export const StatusButton = (
  { children, statusType } :
  {
    children: ReactNode,
    statusType: RecordStatus
  },
) => {
  const { setDialogState } = useConfirmDialog();
  return <Button
    variant='outlined'
    color={'error'}
    onClick={()=>{
      setDialogState({
        title: '操作確認',
        content: (
          <>ステースは本当に
            <Typography component="span" fontWeight={'bold'} color="red" fontSize={'2rem'}>
              「{statusType}」
            </Typography>
            にしますか
          </>

        ),
        cancellable: true,
      });
    }}
  >{children}</Button>;
};

const StatusButtons = () => {
  const statuses: RecordStatus[] = ['他決', '中止', '削除'];

  return (
    <>
      {statuses.map((s) => {
        return (
          <StatusButton key={s} statusType={s}>{s}</StatusButton>
        );
      })}
    </>
  );
};

export const StatusControls = () => {

  return (
    <>
      <PageSubTitle label="状態の編集" />
      <Stack direction={'row'} spacing={2} mt={2} ml={2}>
        <StatusButtons />
      </Stack>
    </>
  );
};