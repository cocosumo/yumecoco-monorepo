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
} ) => {
  

  return (
    <Stack 
      {...stackProps}
      direction={'row'}
      justifyContent={'space-between'}
      spacing={1}
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
      <Stack>
        {quantity}
      </Stack>
      <Stack 
        spacing={1}
      >
        <Stack direction={'row'} spacing={1}>
          <Stack>
            {profitRate}
          </Stack>
          <Stack>
            {taxType}
          </Stack>
          <Stack>
            {unitPrice}
          </Stack>
          <Stack>
            {rowUnitPrice}
          </Stack>
        </Stack>
        <Stack>
          {rowDetails}
        </Stack>
      </Stack>

    </Stack>
  );
};