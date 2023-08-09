import { Alert, Button, Stack, TextField } from '@mui/material';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { useVoidContract } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from 'kokoas-client/src/pages/projContractV2/schema';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';

export const StepReason = ({
  handleCloseDialog,
}: {
  handleCloseDialog: () => void
}) => {
  const [value, setValue] = useState('');
  const { mutateAsync, isLoading } = useVoidContract();
  const envelopeId = useWatch<TypeOfForm>({
    name: 'envelopeId',
  }) as string;

  const handleVoid = async () => {
    await mutateAsync({
      envelopeId,
      voidedReason: `${kintone.getLoginUser().name} : ${value.trim()}`,
    });

    handleCloseDialog();
  };

  if (!envelopeId) return (
    <Alert severity="error">
      エンベロープIDがありません。
    </Alert>
  );

  if (isLoading) return (
    <Loading />
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
          取り下げ
        </Button>
      </Stack>
      
    </Stack>
  );
};