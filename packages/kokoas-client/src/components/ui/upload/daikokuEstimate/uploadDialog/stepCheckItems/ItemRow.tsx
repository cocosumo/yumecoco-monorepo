import { Chip, Stack } from '@mui/material';
import { red } from '@mui/material/colors';
import { CalculationEstimateResults } from 'api-kintone';
import { roundTo } from 'libs';
import { ParsedDaikokuGenka } from 'types';
import { ItemCell } from './ItemCell';
import { ItemRowFormat } from './ItemRowFormat';

export const ItemRow = ({
  item,
  calculatedItem,
}:{
  item: ParsedDaikokuGenka['items'][number],
  calculatedItem: CalculationEstimateResults
})  => {
  const {
    majorItem,
    middleItem,
    material,
    costPrice,
    quantity,
    unitPrice,
    rowUnitPrice,
    rowCostPrice,
    unit,
    rowDetails,
    profitRate,
  } = item;

  /* ココアスの計算は 頭に　`k` をつけています */
  const {
    profitRate: kProfitRate,
    unitPrice: kUnitPrice,
    rowCostPrice: kRowCostPrice,
  } = calculatedItem;

  const parsedKProfitRate = roundTo(kProfitRate * 100, 2);

  if (kRowCostPrice !== rowCostPrice) {
    console.log(kRowCostPrice, rowCostPrice);
  }

  return (
    <ItemRowFormat
      majorItem={(
        <ItemCell>
          {majorItem}
        </ItemCell>
      )}
      middleItem={(
        <ItemCell>
          {middleItem}
        </ItemCell>
      )}
      material={(
        <ItemCell>
          {material}
        </ItemCell>
      )}
      costPrice={(
        <ItemCell textAlign={'right'}>
          {`${costPrice.toLocaleString()} 円`}
        </ItemCell>
      )}
      quantity={(
        <ItemCell>
          {`${quantity.toLocaleString()} ${unit}`}
        </ItemCell>
      )}
      profitRate={(
        <Stack>
          <Chip
            variant='outlined'
            size='small'
            label={`${parsedKProfitRate.toLocaleString()} %`}
            color={parsedKProfitRate !== profitRate ? 'warning' : 'success'}
          />
          {
            parsedKProfitRate !== profitRate &&
            <ItemCell textAlign='center' variant={'caption'}>
              {`${ profitRate.toLocaleString()} %`}
            </ItemCell>
          }

        </Stack>

      )}
      unitPrice={(
        <Stack>
          <Chip
            variant='outlined'
            size='small'
            label={`${kUnitPrice.toLocaleString()} 円`}
            color={kUnitPrice !== unitPrice ? 'warning' : 'success'}
          />
          {
            kUnitPrice !== unitPrice &&
            <ItemCell textAlign='center' variant={'caption'}>
              {`${unitPrice.toLocaleString()} 円`}
            </ItemCell>
          }
        </Stack>
      )}
      rowUnitPrice={(
        <ItemCell
          textAlign={'right'}
          color={unitPrice < 0 ? red[800] : undefined}
          fontWeight={700}
        >
          {`${rowUnitPrice.toLocaleString()} 円`}
        </ItemCell>
      )}
      rowCostPrice={(
        <Stack>
          <Chip
            variant='outlined'
            size='small'
            label={`${kRowCostPrice.toLocaleString()} 円`}
            color={kRowCostPrice !== rowCostPrice ? 'warning' : 'success'}
          />
          {
          kRowCostPrice !== rowCostPrice &&
          <ItemCell textAlign='center' variant={'caption'}>
            {`${rowCostPrice.toLocaleString()} 円`}
          </ItemCell>
        }
        </Stack>

      )}
      rowDetails={(
        <ItemCell>
          {rowDetails}
        </ItemCell>
      )}
    />
  );
};