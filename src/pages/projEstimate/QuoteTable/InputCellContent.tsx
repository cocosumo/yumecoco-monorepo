import { FormControl, FormHelperText, Input, MenuItem, Select, Typography } from '@mui/material';
import { useField } from 'formik';
import { materialsLabelList } from '../constantDefinition';
import quoteCalcProcessDisplay from '../helpers/quoteCalcProcess';
import quotePulldown from '../helpers/quotePulldown';

export type InputCellContentProps = {
  name: string,
  /* value: string, */
};

const InputCellContent = (props: InputCellContentProps) => {
  const [field, meta] = useField(props);
  const { error, touched } = meta;
  const chkName = field.name.split('[')[2].replace(']', '');
  // console.log('コンポーネント種類のチェック', materialsLabelList[chkName]);

  if (materialsLabelList[chkName] === 'input') {
    return (
      <FormControl variant="standard">
        <Input {...field} error={!!error && touched} />
        {(!!error && touched) &&
          <FormHelperText error={!!error && touched}>
            {error}
          </FormHelperText>}
      </FormControl>
    );
  } else if (materialsLabelList[chkName] === 'display') {
    const output = quoteCalcProcessDisplay();
    return (
      <Typography variant='body2' {...field} >
        {output}
      </Typography>
    );
  } else if (materialsLabelList[chkName] === 'pulldown') {
    const output: string[] = quotePulldown(chkName);
    // console.log('pulldown用マップ', output);
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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