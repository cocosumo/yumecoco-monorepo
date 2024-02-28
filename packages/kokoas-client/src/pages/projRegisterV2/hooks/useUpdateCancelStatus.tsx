import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { RecordCancelStatus } from 'types';
import { useTypedFormContext } from './useTypedRHF';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { Alert, AlertTitle, Typography } from '@mui/material';

export const useUpdateCancelStatus = () => {
  const { mutateAsync } = useSaveProject();
  const { getValues } = useTypedFormContext();

  const { setDialogState } = useConfirmDialog();

  const updateCancelStatus = (selectedCancelStatus: RecordCancelStatus) => {
    const projId = getValues('projId');
    const cancelStatuses = getValues('cancelStatus') || [];
    const isIncluded = Boolean(cancelStatuses?.includes(selectedCancelStatus));

    const newCancelStatuses = isIncluded
      ? cancelStatuses?.filter((status) => status !== selectedCancelStatus)
      : [...cancelStatuses, selectedCancelStatus];

    setDialogState({
      title: '確認',
      content: newCancelStatuses.length 
        ?  (
          <Alert severity='warning'>
            工事のキャンセルステータスを
            <Typography fontWeight={'bold'} component={'span'}>
              「
              {newCancelStatuses.join('、')} 
              」
            </Typography>
            に更新しますか？
          </Alert>
        )
        : (
          <Alert severity='warning'>
            <AlertTitle>
              復帰しますか。
            </AlertTitle>
            顧客一覧で検索できるようになります。
          </Alert>
        ),
      handleYes: () => mutateAsync({
        record: {
          cancelStatus: {
            value: newCancelStatuses?.filter(Boolean).join(','),
          },
        },
        projId,
      }),
    });

  };

  return {
    updateCancelStatus,
  };

};