import { Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';
import { EstBody } from '../tables/estimatesVirtual/EstBody';
import { EstimatesDataGrid } from './EstimateDataGrid';
import { EstimatesDataGridMUI } from './EstimatesDataGridMUI';

const options = ['本来', '無料', '有料'] as const;

export const DataGridSamples = () => {
  const [value, setValue] = useState<(typeof options)[number]>('無料');
  
  return (
    <>
      <ButtonGroup 
        sx={{
          m: 2,
        }} 
        variant="contained" 
      >
        {options.map((item) => (
          <Button
            key={item}
            onClick={() => setValue(item)}
            variant={value === item ? 'contained' : 'outlined'}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
      {value === '本来' && ( <EstBody />)}
      {value === '無料' && ( <EstimatesDataGrid />)}
      {value === '有料' && ( <EstimatesDataGridMUI />)}
    </>
  );
};