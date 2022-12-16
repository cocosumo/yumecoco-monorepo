import { FormLabel, Stack, Typography } from '@mui/material';
import { isPast, format, addDays } from 'date-fns';
import { useFormikContext } from 'formik';
import { ReqSendContract } from 'types';

import { useBackdrop, useConfirmDialog } from '../../../hooks';
import { TypeOfForm } from '../form';
import { MethodChoice } from '../parts/Preview/PreviewMenu/startContract/MethodChoices';
import { useContractProcess } from './useContractProcess';


const renderQuestion = (contractDate: Date) => {
  return (
    <Stack spacing={2}>
      <Stack justifyContent={'center'} textAlign="center">
        <FormLabel>
          契約日
        </FormLabel>
        <Typography variant="h4">
          {format(contractDate, 'yyyy年MM月dd日')}
        </Typography>
        <Typography variant={'caption'}>
          {`今日は${format(new Date(), 'yyyy年MM月dd日')}です。`}
        </Typography>
      </Stack>

      <Typography>
        過去の日付になっています。このまま印刷しますか？
      </Typography>
    </Stack>
  );
};

export const useStartContractProcess = ({
  handleClosePreview,
}: {
  handleClosePreview: () => void
}) => {
  const formikContext = useFormikContext<TypeOfForm>();
  const {
    values,
  } = formikContext;

  const {
    contractDate,
  } = values;

  const {
    setDialogState,
    handleClose: handleCloseDialog } = useConfirmDialog();
  const {
    backdropState: { open },
  } = useBackdrop();

  const { handleSendContract } = useContractProcess();

  const isBackdropOpen = open;

  const askSignMethod = () => {
    setDialogState({
      title: '契約手続きを開始',
      content: (
        <MethodChoice
          handleSendContract={(
            signMethod: ReqSendContract['signMethod'],
          ) => {
            handleCloseDialog();
            handleSendContract(signMethod);
          }}

        />),
      withYes: false,
      withNo: true,
      noText: 'キャンセル',
    });
  };

  const handleClickStart = () => {

    if (
      contractDate instanceof Date
      && isPast(addDays(contractDate, 1)) // add 1 day because date today is also considered "past"
    ) {
      setDialogState({
        open:true,
        title: '契約日の確認',
        content: renderQuestion(contractDate),
        withYes: true,
        withNo: true,
        handleYes: askSignMethod, // そのまま印刷
        handleNo: () => {
          // 編集画面に戻る
          handleClosePreview();
        },
        willCloseOnYes: false,
      });
    } else {
      askSignMethod();
    }

  };

  return {
    handleClickStart,
    isBackdropOpen,
    values,
  };

};