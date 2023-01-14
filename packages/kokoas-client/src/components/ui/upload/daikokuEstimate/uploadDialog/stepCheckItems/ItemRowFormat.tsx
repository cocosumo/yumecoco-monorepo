import { Stack, StackProps } from '@mui/material';
import { forwardRef, ReactNode } from 'react';
import { ParsedDaikokuEst } from 'types';

export type ItemRowFormatProps = Record<keyof ParsedDaikokuEst['items'][number], ReactNode> & {
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
    amount,
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
        width={'25%'}
      >
        {majorItem}
        {middleItem}
      </Stack>
      <Stack
        spacing={0.5}
        width={'25%'}
      >
        {material}
      </Stack>
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
            {amount}
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