import { Stack, StackProps } from '@mui/material';
import { ReactNode } from 'react';

export const EstRowFormat = ({
  stackProps,
  majorItem,
  middleItem,
  material,
  materialDetails,
  costPrice,
  quantity,
  profitRate,
  taxType,
  unitPrice,
  rowUnitPrice,
  rowDetails,
}: {
  stackProps?: StackProps,
  rowMoveControls?: ReactNode,
  majorItem: ReactNode,
  middleItem: ReactNode,
  material: ReactNode,
  materialDetails: ReactNode,
  costPrice: ReactNode,
  quantity: ReactNode,
  profitRate: ReactNode,
  taxType: ReactNode,
  unitPrice: ReactNode,
  rowUnitPrice: ReactNode,
  rowDetails: ReactNode,
  rowCopyControls?: ReactNode,
} ) => {
  

  return (
    
    <Stack 
      {...stackProps}
      direction={'row'}
      justifyContent={'space-between'}
      spacing={1}
      width={'92%'}
    >
      <Stack 
        spacing={1}
        width={'15%'}
      >
        {majorItem}
        {middleItem}
      </Stack>
      <Stack 
        spacing={1}
        width={'15%'}
      >
        {material}
        {materialDetails}
      </Stack>
      <Stack width={'15%'}>
        {costPrice}
      </Stack>
      <Stack width={'10%'}>
        {quantity}
      </Stack>
      <Stack 
        spacing={1}
        width={'45%'}
      >
        <Stack 
          direction={'row'} 
          width={'100%'}
          spacing={1}
        >
          <Stack width={'25%'}>
            {profitRate}
          </Stack>
          <Stack width={'25%'}>
            {taxType}
          </Stack>
          <Stack width={'25%'}>
            {unitPrice}
          </Stack>
          <Stack width={'25%'}>
            {rowUnitPrice}
          </Stack>
        </Stack>
        <Stack width={'100%'}>
          {rowDetails}
        </Stack>
      </Stack>

    </Stack>
  );
};