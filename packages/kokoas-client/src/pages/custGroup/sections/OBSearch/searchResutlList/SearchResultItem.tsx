import { FormControlLabel, Radio } from '@mui/material';
import { ICustgroups } from 'types';

import { VirtualItem } from '@tanstack/react-virtual';
import { SearchResultItemContent } from './SearchResultItemContent';





export const SearchResultItem = ({
  item,
  virtualItem,
}:{
  item: ICustgroups,
  virtualItem: VirtualItem,
}) => {


  return (

    <FormControlLabel 
      style={{
        top: 0,
        left: 0,
        width: '100%',
        position: 'absolute',
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`,
        borderBottom: '1px solid #e0e0e0',
      }}
      sx={{
        '& .MuiFormControlLabel-label': {
          flexGrow: 1,
        },
      }}
      value={item.uuid.value}
      control={<Radio />}
      label={(<SearchResultItemContent item={item} />)}
    />
   

  );
};