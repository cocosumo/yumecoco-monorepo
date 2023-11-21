import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useConvertToAndpadByProjId, useSaveAndpadProject, useSaveProject } from 'kokoas-client/src/hooksQuery';
import { SaveToAndpadDialogContent } from './SaveToAndpadDialogContent';
import { getProjById } from 'api-kintone';
import { TForm } from '../../schema';

export const SaveToAndpadDialog = ({
  open,
  handleClose,
  mode,
} : {
  open: boolean
  handleClose: () => void
  mode: '登録' | '更新'
}) => {
  const { projId } = useURLParams<TForm>();
  const { data, isLoading } = useConvertToAndpadByProjId(
    open ? projId : '',
    {
      onError: handleClose,
    },
  );

  const { mutateAsync: mutateAndpad } = useSaveAndpadProject();
  const { mutate: mutateProj } = useSaveProject();

  const handleClick = async () => {
    if (data) {
      mutateAndpad(data)
        .then(async ({
          data:{
            object: {
              システムID: andpadSystemId,
            },
          },
        }) => {
          const { 
            log,
          } = await getProjById(projId || '');

          mutateProj({ 
            projId, 
            record: {
              andpadSystemId: { value: String(andpadSystemId) },
              forceLinkedAndpadSystemId: { value: '' }, // 強制接続解除
              log: {
                type: 'SUBTABLE',
                value: [
                  {
                    id: '',
                    value: {
                      logNote: { value: `Andpadへ${mode}` },
                      logDateTime: { value: new Date().toISOString() },
                    },
                  },
                  ...(log.value ?? []),
                ],
              },
            } });

        });
    }
    handleClose();
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted={false}
      maxWidth={'md'}
      fullWidth
    >
      <DialogTitle>
        {`Andpadへ案件${mode}しますか？`}
      </DialogTitle>
      <SaveToAndpadDialogContent isLoading={isLoading} convertedData={data?.projData} />
      <DialogActions>
        <Button onClick={handleClose}>
          キャンセル
        </Button>
        <AndpadButton
          onClick={handleClick}
          startIcon={<AndpadLogo />}
          disabled={isLoading}
        >
          はい
        </AndpadButton>
      </DialogActions>
    </Dialog>
  );
};