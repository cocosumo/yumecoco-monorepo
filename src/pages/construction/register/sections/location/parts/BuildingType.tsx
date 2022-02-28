import { Radio,  RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import ChoiceContainer from '../../../../../../components/ui/containers/ChoiceContainer';

const buildingTypes =  ['戸建て', 'マンション', '店舗/事務所', 'その他'];

const BuildingType = () => {
  return (
    <FormControl fullWidth>
      <FormLabel>建物種別</FormLabel>
      <ChoiceContainer>
        <RadioGroup
        sx={{ justifyContent: 'space-around' }}
        row
        name="buildingType"
      >
          {buildingTypes.map(item => <FormControlLabel key={item} value={item} control={<Radio />} label={item}/>)}

        </RadioGroup>
      </ChoiceContainer>
    </FormControl>
  );
};

export default BuildingType;