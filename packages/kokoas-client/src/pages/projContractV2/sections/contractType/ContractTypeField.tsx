import {
  Alert,
  AlertTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { ContractType, TypeOfForm, contractTypes } from '../../schema';
import { useHasMainContract } from '../../hooks/useHasMainContract';


export const ContractTypeField = () => {

  const { control  } = useFormContext<TypeOfForm>();

  const { data: hasMainContract } = useHasMainContract();

 
  return (
    <Controller
      name={'contractType'}
      control={control}
      render={({
        field: {
          onChange,
          value,
          ...restField
        },
        fieldState: {
          isDirty,
          error,
        },
      }) => {
        const showError = !!error && isDirty;
        

        return (
          <FormControl>
            <FormLabel id="contractTypeLabel">
              カテゴリ
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="contractTypeLabel"
              onChange={(e) => {
                onChange(e.target.value as string);
              }}
              value={value}
              {...restField}
            >
           
              {contractTypes
                .map(choice => {

                  const disallowAdd = choice === '追加' && !hasMainContract;

                  return (
                    <FormControlLabel
                      key={choice}
                      value={choice}
                      control={<Radio />}
                      label={choice}
                      disabled={disallowAdd}
                      title={disallowAdd ? '工事に本契約ないと追加契約ができません' : undefined}
                    />    
                  );
                })}

              {!(contractTypes).includes(value as ContractType) && (
              
              <FormControlLabel
                value={value}
                control={<Radio />}
                label={(
                  <Alert severity="warning">
                    <AlertTitle>
                      {value}
                    </AlertTitle>
                    廃止されました。他のカテゴリを選択したら、この選択肢は消えます。戻したい場合、保存せずにページをリロードしてください。
                  </Alert>)}
              />    
                
              )}


            </RadioGroup>
            <FormHelperText>
              {showError && error?.message}
            </FormHelperText>
          </FormControl>
         
        );
      }}
    />
    
  );
};