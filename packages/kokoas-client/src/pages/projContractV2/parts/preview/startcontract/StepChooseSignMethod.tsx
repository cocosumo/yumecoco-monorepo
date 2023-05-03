import { Box, Button, Stack } from '@mui/material';
import { MethodChoiceButton } from './MethodChoiceButton';
import { BiChip } from '@react-icons/all-files/bi/BiChip';
import { FaFileSignature } from '@react-icons/all-files/fa/FaFileSignature';
import { useSendContract } from 'kokoas-client/src/hooksQuery';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import { TSignMethod } from 'types';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';

export const StepChooseSignMethod = ({
  handleCancel,
} : {
  handleCancel: () => void
}) => {
  const {
    getValues,
  } = useFormContext<TypeOfForm>();

  const {
    mutate,
    isLoading,
  } = useSendContract();

  const handleSendContract = (signMethod: TSignMethod) => {
    const contractId = getValues('contractId') as string;
    mutate({ contractId, signMethod });
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }


  return (
    <Stack
      spacing={2}
    >
     
      <MethodChoiceButton
        mainLabel='電子手続き'
        secondaryLabel='顧客と担当者が電子サインしたら、店長と経理が最終確認を行います。'
        handleClick={()=> handleSendContract('electronic')}
        startIcon={<BiChip size={30} />}
      />

      <MethodChoiceButton
        mainLabel='紙印刷'
        secondaryLabel='担当者が印刷し、サインが出来たら、アップロードしてください。店長と経理が最終確認を行います。'
        handleClick={()=> handleSendContract('wetInk')}
        startIcon={<FaFileSignature size={24} />}
      />

      <Box
        display='flex'
        justifyContent='right'
      >
        <Button
          color='error'
          variant='outlined'
          onClick={handleCancel}
        >
          キャンセル
        </Button>
      </Box>

    </Stack>
  );
};