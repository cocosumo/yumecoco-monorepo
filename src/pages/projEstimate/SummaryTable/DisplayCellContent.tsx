import { Typography } from '@mui/material';
import { useField } from 'formik';

export type DisplayCellContentProps = {
  name: string,
  /* value: string, */
};
const DisplayCellContent = (props: DisplayCellContentProps) => {
  const [field] = useField(props);
  // const { values } = useFormikContext<TypeOfForm>();

  /* 表示内容の算出処理 */
  // const output = summaryCalcProcess(field, values);
  
  return (
    <Typography variant='body2' >
      {field.value}
    </Typography>
  );
};

export default DisplayCellContent;