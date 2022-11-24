
import { useStoreOptions } from 'kokoas-client/src/hooksQuery';
import { FormikSelect } from '../../../../components/ui/selects';

import { FormFieldKeys } from '../form';


export const StoreSelect = () => {
  const { data: stores } = useStoreOptions();

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