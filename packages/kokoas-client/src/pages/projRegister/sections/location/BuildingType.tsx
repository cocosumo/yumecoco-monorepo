
import { FormikRadio } from '../../../../components/ui/radio';
import { buildingTypes } from 'types';



export const BuildingType = ({
  disabled,
}: {
  disabled: boolean
}) => {
  return (
    <FormikRadio name="buildingType" label="建物種別" choices={buildingTypes}
      disabled={disabled}
    />);
};