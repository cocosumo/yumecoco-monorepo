import { Stack, StackProps } from '@mui/material';
import { forwardRef, ReactNode } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../form';

export interface EstRowFormatProps {
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
}

export const EstRowFormat = forwardRef<HTMLElement, EstRowFormatProps>((props, ref ) => {
  const { control } = useFormContext<TypeOfForm>();
  const status = useWatch({
    name: 'status',
    control,
  });

  const showTaxType = status === '工事実行';

  const {
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
        width={'15%'}
      >
        {majorItem}
        {middleItem}
      </Stack>
      <Stack
        spacing={0.5}
        width={'15%'}
      >
        {material}
        {materialDetails}
      </Stack>
      <div style={{ width: '14%' }}>
        {costPrice}
      </div>
      <div style={{ width: '14%' }}>
        {quantity}
      </div>
      <Stack
        spacing={0.5}
        width={'42%'}
      >
        <Stack
          direction={'row'}
          width={'100%'}
          spacing={1}
        >
          <Stack width={'25%'}>
            {profitRate}
          </Stack>
          {showTaxType && (
          <Stack width={'12%'}>
            {taxType}
          </Stack>
          )}

          <Stack width={'30%'}>
            {unitPrice}
          </Stack>
          <Stack width={'33%'}>
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

EstRowFormat.displayName = 'EstRowFormat';