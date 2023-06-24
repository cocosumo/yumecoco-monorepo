import { ControlledTextField } from '../../fields/ControlledTextField';
import { useTypedWatch } from '../../hooks/useTypedRHF';

export const TempAddressField = () => {
  const isEnabled = useTypedWatch({
    name: 'isAddressKari',
  });

  return (
    <ControlledTextField
      name="addressKari"
      label="仮換地住所"
      placeholder="愛知県名古屋市中区"
      disabled={!isEnabled}
    />
  );
};