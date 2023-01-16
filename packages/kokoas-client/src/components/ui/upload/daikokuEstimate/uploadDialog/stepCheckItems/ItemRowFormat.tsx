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
    unitPrice,
    rowDetails,
    costPrice,
    rowUnitPrice,
  } = props;

  return (

    <Stack
      {...stackProps}
      className={'row'}
      direction={'row'}
      justifyContent={'space-between'}
      spacing={1}
      width={'93%'}
      ref={ref}
    >
      <Stack
        spacing={0.5}
        width={'20%'}
      >
        {majorItem}
        {middleItem}
      </Stack>
      <Stack
        spacing={0.5}
        width={'20%'}
      >
        {material}
      </Stack>
      <div style={{ width: '10%' }}>
        {costPrice}
      </div>
      <div style={{ width: '14%' }}>
        {quantity}
      </div>
      <Stack
        spacing={0.5}
        width={'24%'}
      >
        <Stack
          direction={'row'}
          width={'100%'}
          spacing={1}
        >
          <Stack width={'50%'}>
            {unitPrice}
          </Stack>
          <Stack width={'50%'}>
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