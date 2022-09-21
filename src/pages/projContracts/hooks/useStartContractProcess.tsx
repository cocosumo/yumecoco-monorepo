import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { generateParams } from '../../../helpers/url';
import { useBackdrop, useConfirmDialog, useSnackBar } from '../../../hooks';
import { pages } from '../../Router';
import { sendContract } from '../api/docusign/sendContract';
import { TypeOfForm } from '../form';
import { MethodChoice } from '../parts/PreviewToolBar/startContract/MethodChoices';

export const useStartContractProcess = () => {
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { custGroupId, projId } = values;
  const { setDialogState } = useConfirmDialog();
  const { setSnackState }  = useSnackBar();
  const {
    setBackdropState,
    backdropState: { open },
  } = useBackdrop();
  const navigate = useNavigate();

  const isBackdropOpen = open;


  const handleSendContract = async () => {

    try {
      setBackdropState({
        open: true,
      });

      const result = await sendContract(projId, custGroupId);

      setBackdropState({
        open: false,
      });

      setValues({
        ...values,
        envelopeId: result.envelopeId,
        envelopeStatus: result.envelopeStatus,
      });


      setSnackState({
        open: true,
        autoHideDuration: 20000,
        severity: 'success',
        message: '送信が成功しました。',
      });

    } catch (err) {

      setSnackState({
        open: true,
        autoHideDuration: 20000,
        severity: 'error',
        message: <>
          {err.message}
          <Button
            variant='contained'
            onClick={()=>navigate(`${pages.custGroupEdit}?${generateParams({
              projId,
              custGroupId,
            })}`)}
          >
            顧客
          </Button>
        </>,
      });
      setBackdropState({
        open: false,
      });

    }

  };



  const handleClickStart = () => {
    setDialogState({
      title: '契約手続きを開始',
      content: <MethodChoice />,
      handleYes: handleSendContract,
      withYes: false,
      withNo: true,
      noText: 'キャンセル',

    });
  };

  return {
    handleClickStart,
    isBackdropOpen,
    values,
  };

};