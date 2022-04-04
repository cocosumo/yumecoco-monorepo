import { Radio,  RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import ChoiceContainer from '../../../../../../components/ui/containers/ChoiceContainer';
import { useField } from 'formik';
import { BuildingTypeVals } from '../../../form';

const buildingTypes : BuildingTypeVals[] =  ['戸建て', 'マンション', '店舗/事務所', 'その他'];

const BuildingType = () => {
  const [field] = useField('buildingType');
  return (
    <FormControl fullWidth>
      <FormLabel>建物種別</FormLabel>
      <ChoiceContainer>
        <RadioGroup
        sx={{ justifyContent: 'space-around' }}
        row
        {...field}
      >
          {buildingTypes.map(item => <FormControlLabel key={item} value={item} control={<Radio />} label={item}/>)}

        </RadioGroup>
      </ChoiceContainer>
    </FormControl>
  );
};

export default BuildingType;