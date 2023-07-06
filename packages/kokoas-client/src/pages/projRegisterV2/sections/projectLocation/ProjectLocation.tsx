import { Postal } from './postalField/Postal';
import { Alert, Stack } from '@mui/material';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { useTypedFormContext, useTypedWatch } from '../../hooks/useTypedRHF';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { TempAddressField } from './TempAddressField';
import { CopyLocation } from './copyLocation/CopyLocation';
import { FinalAddress } from './FinalAddress';

export const ProjectLocation = () => {

  const {
    control,
  } = useTypedFormContext();

  const hasContract = useTypedWatch({
    name: 'hasContract',
  }) as boolean;

  return (
    <Stack 
      spacing={2}
      sx={{
        maxWidth: '600px',
      }}
    >
      {hasContract && (
        <Alert severity='info'>
          契約後は一部編集出来ません。
        </Alert>
      )}

      {!hasContract && (<CopyLocation />)}

      <Postal disabled={hasContract} />

      <ControlledTextField
        name='address1'
        label='住所（県市区町村）'
        placeholder='愛知県名古屋市中区'
        disabled={hasContract}
        required
      />
  
      <ControlledTextField
        name={'address2'}
        label='住所（番地以降）'
        placeholder='２番地１９'
        disabled={hasContract}
        required
      />

      <FinalAddress />

      <ControlledCheckBox 
        label='仮換地地番を入力する' 
        name="isAddressKari"
        control={control}
      />

      <TempAddressField /> 

    </Stack>

  );
};