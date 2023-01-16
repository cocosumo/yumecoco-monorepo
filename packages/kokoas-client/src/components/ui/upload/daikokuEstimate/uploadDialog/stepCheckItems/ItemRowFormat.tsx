import { Stack, StackProps } from '@mui/material';
import { forwardRef, ReactNode } from 'react';
import { ParsedDaikokuGenka } from 'types';

export type ItemRowFormatProps = Record<keyof ParsedDaikokuGenka['items'][number], ReactNode> & {
  stackProps?: StackProps,
};

export const ItemRowFormat = forwardRef<HTMLElement, Partial<ItemRowFormatProps>>((props, ref ) => {

  const {
    stackProps,
    majorItem,
    middleItem,
    material,
    quantity,
    profitRate,
    unitPrice,
    rowDetails,
    costPrice,
    rowUnitPrice,
    rowCostPrice,
  } = props;

  return (

    <Stack
      {...stackProps}
      className={'row'}
      direction={'row'}
      justifyContent={'space-between'}
      spacing={1}
      width={'94%'}
      ref={ref}
    >
      <Stack
        spacing={0.5}
        width={'10%'}
      >
        {majorItem}
        {middleItem}
      </Stack>
      <Stack
        spacing={0.5}
        width={'10%'}
      >
        {material}
      </Stack>
      <div style={{ width: '8%' }}>
        {costPrice}
      </div>
      <div style={{ width: '14%' }}>
        {quantity}
      </div>
      <Stack width={'10%'}>
        {profitRate}

      </Stack>
      <Stack
        spacing={0.5}
        width={'38%'}
      >
        <Stack
          direction={'row'}
          width={'100%'}
          spacing={1}
        >
          <Stack width={'33%'}>
            {rowCostPrice}
          </Stack>
          <Stack width={'33%'}>
            {unitPrice}
          </Stack>
          <Stack width={'34%'}>
            {rowUnitPrice}
          </Stack>
        </Stack>
        <Stack width={'100%'}>
          {rowDetails}
        </Stack>
      </Stack>

    </Stack>
  );
});

ItemRowFormat.displayName = 'ItemRowFormat';