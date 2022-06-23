import { Button,  Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { ReactNode } from 'react';
import { PageSubTitle } from '../../../../components/ui/labels';
import { RecordCancelStatus, recordCancelStatuses } from '../../../../config/formValues';
import { useConfirmDialog, useSnackBar } from '../../../../hooks';
import { KeyOfProjForm, TypeOfProjForm } from '../../form';

export const StatusButton = (
  { children, statusType } :
  {
    children: ReactNode,
    statusType: RecordCancelStatus
  },
) => {
  const name: KeyOfProjForm = 'cancelStatus';
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();
  const [field, meta, helper] = useField<TypeOfProjForm['cancelStatus']>({ name: name });

  const hasMatchStatus = field.value.includes(statusType);

  const handleSetFieldValue = (status: RecordCancelStatus) => {
    if (hasMatchStatus) {
      helper.setValue(meta.value.filter((i) => i !== status));
      setSnackState({
        open: true,
        severity: 'warning',
        message: `「${status}」を外しました。保存されるまで反映しません。`,
      });
    } else {
      helper.setValue([...meta.value, status]);
      setSnackState({
        open: true,
        severity: 'warning',
        message: `「${status}」ステータスを追加しました。保存されるまで反映しません。`,
      });
    }
  };

  const handleStatusClick = () => {
    if (hasMatchStatus) {
      handleSetFieldValue(statusType);
      return;
    }

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
      handleYes: ()=>{
        handleSetFieldValue(statusType);
      },
    });

  };


  return <Button
    variant={hasMatchStatus ? 'contained' : 'outlined'}
    color={'error'}
    onClick={handleStatusClick}
  >{children}</Button>;
};

const StatusButtons = () => {
  const statuses = recordCancelStatuses;

  return (
    <Stack direction={'row'} spacing={2} mt={2}>
      {statuses.map((s) => {
        return (
          <StatusButton key={s} statusType={s}>{s}</StatusButton>
        );
      })}
    </Stack>
  );
};

export const StatusControls = () => {

  return (
    <>
      <PageSubTitle label="状態の編集" />
      <StatusButtons />
    </>
  );
};