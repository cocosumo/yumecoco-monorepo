import { Postal } from './postalField/Postal';
import { Alert, Button, Stack } from '@mui/material';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { useTypedFormContext, useTypedWatch } from '../../hooks/useTypedRHF';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { CopyLocation } from './copyLocation/CopyLocation';
import { MaskedPostal } from './postalField/MaskedPostal';

export const ProjectLocation = () => {

  const {
    control,
  } = useTypedFormContext();

  const [
    hasContract,
    isAddressKari,
    isShowFinalAddress,
  ] = useTypedWatch({
    name: [
      'hasContract',
      'isAddressKari',
      'isShowFinalAddress',
    ],
  }) as boolean[];

  return (
    <Stack 
      spacing={2}
      sx={{
        maxWidth: '1200px',
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
        width={600}
        required
      />

      <Stack direction={'row'} spacing={2}>
        <ControlledTextField
          name={'address2'}
          label='住所（番地以降）'
          placeholder='２番地１９'
          disabled={hasContract}
          required
          width={600}
        />
        
        <ControlledCheckBox 
          label='左記　仮換地（該当する場合はレ点を入れてください）' 
          name="isAddressKari"
          control={control}
        />
      </Stack>

      {isAddressKari && ( <ControlledCheckBox 
        label='確定後住所を入力する（該当する場合はレ点を入れてください）' 
        name="isShowFinalAddress"
        control={control}
                          />  )}

                          
      {isShowFinalAddress && isAddressKari && (
      <>
        <Stack direction={'row'} spacing={2}>
          <MaskedPostal 
            name='finalPostal'
            label="確定後郵便番号"
          /> 
          <Button
            size='small'
            variant='outlined'
          >
            仮換地住所をコピー
          </Button>

        </Stack>
       
        <ControlledTextField
          name={'finalAddress1'}
          label='確定住所（番地以降）'
          placeholder='２番地１９'
          disabled={hasContract}
          required
          width={600}
        />
        <ControlledTextField
          name={'finalAddress2'}
          label='確定住所（番地以降）'
          placeholder='２番地１９'
          disabled={hasContract}
          required
          width={600}
        />
      </>
      )}

    </Stack>

  );
};