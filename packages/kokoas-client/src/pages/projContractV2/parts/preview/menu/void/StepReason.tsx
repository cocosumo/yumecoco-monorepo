import { Alert, Button, Stack, TextField } from '@mui/material';
import { useVoidContract } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from 'kokoas-client/src/pages/projContractV2/schema';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';

export const StepReason = ({
  handleCloseDialog,
  handleNext,
}: {
  handleCloseDialog: () => void
  handleNext: () => void
}) => {
  const [value, setValue] = useState('');
  const { mutate } = useVoidContract();
  const envelopeId = useWatch<TypeOfForm>({
    name: 'envelopeId',
  }) as string;

  const handleVoid = async () => {
    mutate({
      envelopeId,
      voidedReason: `${kintone.getLoginUser().name} : ${value.trim()}`,
    }, {
      onSuccess: () => {
        console.log('triggered onSuccess');
        handleNext();
      },
    });
  };

  if (!envelopeId) return (
    <Alert severity="error">
      エンベロープIDがありません。管理者にご連絡ください。
    </Alert>
  );


  return (
    <Stack spacing={2}>

      <Alert color="warning" severity="warning">
        すでにエンベロープへの署名を完了した受信者には、エンベロープが無効になったことを示すメールが送信されます。
      </Alert>
      <TextField label="理由" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='理由を入力してください。'
        multiline
        rows={4}
      />

      <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
        <Button onClick={handleCloseDialog}>
          キャンセル
        </Button>
        <Button
          color='error'
          variant='contained'
          onClick={handleVoid}
          disabled={!value.trim() || !envelopeId}
        >
          無効にする
        </Button>
      </Stack>
      
    </Stack>
  );
};