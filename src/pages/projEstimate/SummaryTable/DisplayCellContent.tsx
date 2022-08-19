import { Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import summaryCalcProcess from '../helpers/summaryCalcProcess';

export type DisplayCellContentProps = {
  name: string,
  /* value: string, */
};
const DisplayCellContent = (props: DisplayCellContentProps) => {
  const [field] = useField(props);
  const { values } = useFormikContext<TypeOfForm>();

  /* 表示内容の算出処理 */
  const output = summaryCalcProcess(field, values);
  
  return (
    <Typography variant='body2' {...field} >
      {output}
    </Typography>
  );
};

export default DisplayCellContent;