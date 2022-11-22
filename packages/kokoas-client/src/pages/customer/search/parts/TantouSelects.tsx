
import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { translations } from 'kokoas-client/src/helpers/translations';
import { TAgents } from 'types';

import { FormikSelect } from '../../../../components/ui/selects';
import { useEmployeeOptions } from '../../../../hooksQuery/useEmployeeOptions';
import { FormFieldKeys, initialValues } from '../form';

const TantouSelect = ({
  name,
}: {
  name: TAgents
}) => {
  const { values } = useFormikContext<typeof initialValues>();
  const options = useEmployeeOptions({ agentType: name, storeId: values.storeId });

  return (
    <Grid item xs={12} md={2}>
      <FormikSelect name={name as FormFieldKeys} label={translations[name]} options={options} />
    </Grid>
  );
};


export const TantouSelects = () => {

  return (
    <>
      {(['cocoAG', 'cocoConst', 'yumeAG'] as TAgents[])
        .map(item => {
          return <TantouSelect key={item} name={item} />;
        })}
    </>
  );
};
