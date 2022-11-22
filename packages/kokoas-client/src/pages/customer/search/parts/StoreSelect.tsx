
import { useFormikContext } from 'formik';
import { useStoreOptions } from 'kokoas-client/src/hooksQuery';
import { FormikSelect } from '../../../../components/ui/selects';

import { FormFieldKeys, TypeOfForm } from '../form';


export const StoreSelect = () => {
  const { values: {
    territory,
  } } = useFormikContext<TypeOfForm>();

  const { data: stores } = useStoreOptions({
    territory,
  });

  return (
    <FormikSelect
      name={'storeId' as FormFieldKeys}
      label='店舗'
      options={[
        { label: '--', value: '' },
        ...(stores?.length ? stores : []),
      ]}
    />

  );
};