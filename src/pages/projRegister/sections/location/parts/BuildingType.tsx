
import { BuildingTypeVals } from '../../../form';
import { FormikRadio } from '../../../../../components/ui/radio';

const buildingTypes : BuildingTypeVals[] =  ['戸建て', 'マンション', '店舗/事務所', 'その他'];

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