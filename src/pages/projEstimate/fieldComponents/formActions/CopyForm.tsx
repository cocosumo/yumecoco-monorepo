import { Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useConfirmDialog, useSnackBar } from '../../../../hooks';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { saveForm } from '../../api/saveForm';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../Router';
import { generateParams } from '../../../../helpers/url';


export const CopyForm = () => {
  const { values } = useFormikContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const { setDialogState, handleClose } = useConfirmDialog();
  const navigate = useNavigate();
  const { estimateId } = values;

  const handleCopy = async () => {
    try {
      handleClose();
      const resp = await saveForm({ ...values, estimateId: '' });
      if ('id' in resp) {
        const oldProjEstimateId = estimateId;
        const urlParams = generateParams({ projEstimateId: resp.id });

        setSnackState({
          open: true,
          autoHideDuration: 5000,
          message: `見積番号：${oldProjEstimateId}をコピーして、見積番号：${resp.id}を作成しました。`,
          severity: 'success',
          handleClose: ()=>navigate(`${pages.projEstimate}?${urlParams}`),
        });
      } else {
        throw new Error('コピーが失敗しました。');
      }
    } catch (err: any) {
      setSnackState({
        open: true,
        message: err.message,
        severity: 'error',
      });
    }

  };

  const handleClickCopy = () => {
    setDialogState({
      open: true,
      title: '見積もりのコピーを作成',
      content: 'この見積もりをコピーして新たに作成します。',
      handleYes: handleCopy,
      cancellable: true,
    });
  };

  return (
    <Tooltip title={'当レコードをコピーし、新なレコードを作成します'}>
      <Button
        variant="outlined"
        size="large"
        onClick={handleClickCopy}
      >
        <ContentCopyIcon />
      </Button>
    </Tooltip>
  );
};