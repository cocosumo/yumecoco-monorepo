
import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { EmployeeType } from '../../../../api/kintone/employees/GET';

import { FormikSelect } from '../../../../components/ui/selects';
import { useEmployeeOptions } from '../../../../hooks';
import { FormFieldNames, initialValues } from '../form';



const resolveLabel = (name: EmployeeType) => {
  switch (name) {
    case 'cocoAG':
      return 'ここすも営業';
    case 'yumeAG':
      return 'ゆめてつ営業';
    case 'cocoConst':
      return 'ここすも工事';
    default:
      return '担当者';
  }
};

const TantouSelect = (props: { name: EmployeeType }) => {
  const { values } = useFormikContext<typeof initialValues>();
  const options = useEmployeeOptions({ type: props.name, storeId: values.storeId });

  return (
    <Grid item xs={12} md={2}>
      <FormikSelect name={props.name as FormFieldNames } label={resolveLabel(props.name)} options={options}/>
    </Grid>
  );
};


export const TantouSelects = () => {

  return (
    <>
      {(['cocoAG', 'cocoConst', 'yumeAG'] as EmployeeType[])
        .map(item => {
          return <TantouSelect key={item} name={item}/>;
        })}
    </>
  );
};
