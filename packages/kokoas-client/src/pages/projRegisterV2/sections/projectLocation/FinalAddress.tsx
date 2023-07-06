import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { addressBuilder } from 'libs';

export const FinalAddress = () => {
  const { control, getValues } = useTypedFormContext();

  return (
    <Controller 
      control={control}
      name={'finalAddress'}
      render={({
        field,
        fieldState: {
          error,
          isTouched,
        },
      }) => {

        const {
          onChange,
        } = field;

        const showError = isTouched && !!error;

        return (
          <TextField 
            {...field}
            label={'確定後住所'} 
            placeholder={'〒123-4567 愛知県名古屋市中区２番地１９'}
            size='small'
            error={showError}
            helperText={showError ? error?.message : '契約'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="上記の住所をコピーする">
                    <IconButton
                      onClick={() => {
                        const [
                          postal,
                          address1,
                          address2,
                        ] = getValues([
                          'postal',
                          'address1',
                          'address2',
                        ]);

                        const parsedAddress = addressBuilder({
                          postal,
                          address1,
                          address2,
                        });

                        onChange(parsedAddress);
                      }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
};