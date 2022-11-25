import { Grid, TextField, TextFieldProps } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { hiraToKana } from '../../../../../helpers/utils';
import { useField, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import { TypeOfForm } from '../../form';
import { FormikTextFieldV2 as FormikTextField } from '../../../../../components/ui/textfield';
import * as AutoKana from 'vanilla-autokana';


export const NameInput = ({
  custNameFN,
  custNameReadingFN,
}: {
  custNameFN: string,
  custNameReadingFN: string
}) => {
  const { setFieldValue } = useFormikContext<TypeOfForm>();
  const [inputVal, setInputVal] = useState<string | null>(null);
  const autokana = useRef<AutoKana.AutoKana | null>(null);

  useEffect(() => {
    autokana.current = AutoKana.bind(`#${custNameFN}`, `#${custNameReadingFN}`);
    autokana.current?.start();
  }, [custNameFN, custNameReadingFN]);

  const [
    field,
    meta,
  ] = useField(custNameFN);
  const { name, value } = field;
  const { touched, error } = meta;


  const changeHandlerInput: TextFieldProps['onChange'] =
    useMemo(
      () => debounce(
        (el) => {
          setFieldValue(custNameFN, (el.target as HTMLInputElement).value);
          const katakana = hiraToKana(autokana.current?.getFurigana() ?? '');
          setFieldValue(custNameReadingFN, katakana);
          setInputVal(null);

        }, 50),
      [custNameReadingFN, custNameFN, setFieldValue],
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
          placeholder='ヤマダ　タロウ' 
          required
        />
      </Grid>
    </>
  );
};