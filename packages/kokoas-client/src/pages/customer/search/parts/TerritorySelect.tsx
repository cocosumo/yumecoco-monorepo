import { FormikSelect } from 'kokoas-client/src/components/ui/selects';
import { territories } from 'types';
import { getFormField } from '../form';

export const TerritorySelect = () => {

  return (
    <FormikSelect
      name={getFormField('territory')}
      label='領域'
      options={
        [
          { label: '---', value: '' },
          ...territories.map((t => ({
            label: t, value: t,
          }))),
        ]

      }
    />
  );
};