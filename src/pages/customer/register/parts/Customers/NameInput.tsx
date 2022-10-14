import { Grid, TextField, TextFieldProps } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import historykana from 'historykana';
import { hiraToKana } from '../../../../../helpers/utils';
import { useField, useFormikContext } from 'formik';
import { debounce } from 'lodash';
import { CustomerForm } from '../../form';
import { FormikTextField } from '../../../../../components/ui/textfield';

export const NameInput = ({
  custNameFN,
  custNameReadingFN,
}: {
  custNameFN: string,
  custNameReadingFN: string
}) => {
  const { setFieldValue, getFieldProps } = useFormikContext<CustomerForm>();
  const { value: custNameReadingVal } = getFieldProps(custNameReadingFN);
  const [inputVal, setInputVal] = useState<string | null>(null);
  const [
    field,
    meta,
  ] = useField(custNameFN);
  const { name, value } = field;
  const { touched, error } = meta;


  const inputHistories = useRef<string[]>([]);

  const changeHandlerInput: TextFieldProps['onChange'] =
    useMemo(
      () => debounce(
        (el) => {
          setFieldValue(custNameFN, (el.target as HTMLInputElement).value);
          setFieldValue(custNameReadingFN, hiraToKana(historykana(inputHistories.current)));

          setInputVal(null);
        }, 1000),
      [custNameReadingVal],
    );

  const isShowError = touched && !!error;
  return (
    <>
      <Grid item xs={12}>
        <TextField
          name={name}
          id={custNameFN}
          label={'氏名'}
          placeholder='山田　太郎'
          value={inputVal === null ? value : inputVal}
          required
          onInput={(e) => {
            const text = (e.target as  HTMLInputElement).value;
            console.log(inputHistories);
            inputHistories.current.push(text);
            setInputVal(text);
          }}
          onChange={changeHandlerInput}
          fullWidth
          error={isShowError}
          helperText={isShowError && error}
        />

      </Grid>
      <Grid item xs={12}>
        <FormikTextField
          id={custNameReadingFN}
          name={custNameReadingFN}
          label="氏名フリガナ"
          placeholder='ヤマダ　タロウ' required
          onFocus={() => {
            if (!custNameReadingFN) {
              setFieldValue(custNameReadingFN, hiraToKana(historykana(inputHistories.current)));
            }
          }}
        />
      </Grid>
    </>
  );
};