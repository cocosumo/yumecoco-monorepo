import { ControlledDatePicker } from '../../fields/ControlledDatePicker';
import { useTypedWatch } from '../../hooks';
import { TForm } from '../../schema';

export const EstatePurchaseDate = () => {

  const realEstateStatus = useTypedWatch({
    name: 'realEstateStatus',
  }) as TForm['realEstateStatus'];

  return (
    <ControlledDatePicker
      name='estatePurchaseDate'
      disabled={realEstateStatus !== 'あり'}
    />
  );
};