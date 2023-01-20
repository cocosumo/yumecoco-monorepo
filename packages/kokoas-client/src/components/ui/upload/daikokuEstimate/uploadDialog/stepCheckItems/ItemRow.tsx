import { red } from '@mui/material/colors';
import { CalculationEstimateResults } from 'api-kintone';
import { roundTo } from 'libs';
import { ParsedDaikokuGenka } from 'types';
import { ItemCell } from './ItemCell';
import { ItemCellCompared } from './ItemCellCompared';
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
    rowUnitPriceAfterTax: kRowUnitPriceAfterTax,
  } = calculatedItem;

  const parsedKProfitRate = roundTo(kProfitRate * 100, 2);

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
        <ItemCellCompared
          value={parsedKProfitRate}
          daikokuValue={profitRate}
          unit={'%'}
        />)}
      rowCostPrice={(
        <ItemCellCompared
          value={kRowCostPrice}
          daikokuValue={rowCostPrice}
        />)}
      unitPrice={(
        <ItemCellCompared
          value={kUnitPrice}
          daikokuValue={unitPrice}
        />)}
      rowUnitPrice={(
        <ItemCell
          textAlign={'right'}
          color={rowUnitPrice < 0 ? red[800] : undefined}
          fontWeight={700}
        >
          {`${rowUnitPrice.toLocaleString()} 円`}
        </ItemCell>
      )}
      rowUnitPriceAfterTax={(
        <ItemCell
          textAlign={'right'}
          color={kRowUnitPriceAfterTax < 0 ? red[800] : undefined}
          fontWeight={12}
        >
          {`${kRowUnitPriceAfterTax.toLocaleString()} 円`}
        </ItemCell>
      )}
      rowDetails={(
        <ItemCell>
          {rowDetails}
        </ItemCell>
      )}
    />
  );
};