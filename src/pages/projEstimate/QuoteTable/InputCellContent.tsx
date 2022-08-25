import { debounce, FormControl, FormHelperText, Input, MenuItem, Select, Typography } from '@mui/material';
import { useField } from 'formik';
import { materialsLabelList } from '../constantDefinition';
import quotePulldown from '../helpers/quotePulldown';

export type InputCellContentProps = {
  name: string,
  /* value: string, */
};

const InputCellContent = (props: InputCellContentProps) => {
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;
  const chkName = field.name.split('[')[2].replace(']', '');

  // INPUT用onchange処理
  const changeHandlerInput
  : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
   = debounce((el) => {
     console.log('2s after chk', el.target.value);

     helpers.setValue(el.target.value, true);
   }, 2000);

 
  if (materialsLabelList[chkName] === 'input') {
    return (
      <FormControl variant="standard">
        <Input {...field} error={!!error && touched} onChange={changeHandlerInput} value={undefined} />
        {(!!error && touched) &&
          <FormHelperText error={!!error && touched}>
            {error}
          </FormHelperText>}
      </FormControl>
    );
  } else if (materialsLabelList[chkName] === 'display') {
    return (
      <Typography variant='body2'>
        {field.value + '円'}
      </Typography>
    );
  } else if (materialsLabelList[chkName] === 'pulldown') {
    const output: string[] = quotePulldown(chkName);
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size='small'>
        <Select {...field}>
          <MenuItem value="">
            <em>-</em>
          </MenuItem>
          {output.map((item) => {
            return (<MenuItem value={item} key={`${field.name}_${item}`}>{item}</MenuItem>);
          })
          }
        </Select>
        {(!!error && touched) &&
          <FormHelperText error={!!error && touched}>
            {error}
          </FormHelperText>}
      </FormControl>
    );
  } else if (materialsLabelList[chkName] === 'pullldownAndInput') {
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select {...field}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    );
  }

  /* エラー対策：default */
  return (<div>表示エラーです</div>);

};

export default InputCellContent;