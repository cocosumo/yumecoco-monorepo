/* Update values based on edited fields */

import { calculateEstimateRow, calculateEstimateSummary } from 'api-kintone';
import { roundTo } from 'libs';
import debounce from 'lodash/debounce';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../form';

export type UseSmartHandlers =  ReturnType<typeof useSmartHandlers>;

export const useSmartHandlers = () => {

  const formReturn = useFormContext<TypeOfForm>();

  const { setValue, getValues } = formReturn;

  /******************
  * 合計欄の計算 */
  const handleUpdateSummary = useMemo(
    () => debounce(()=>{
      const items = getValues('items');
      const parsedTaxRate = getValues('taxRate') / 100;

      const {
        totalCostPrice,
        totalAmountAfterTax,
        totalAmountBeforeTax,
      } = calculateEstimateSummary(
        items.map(({
          taxable,
          rowCostPrice,
          rowUnitPriceBeforeTax,
        }) => {
          return {
            isTaxable: taxable,
            rowCostPrice,
            rowUnitPriceBeforeTax,
          };
        }),
        parsedTaxRate,
      );

      setValue('totalCostPrice', totalCostPrice);
      setValue('totalAmountBeforeTax', totalAmountBeforeTax);
      setValue('totalAmountAfterTax', totalAmountAfterTax);

    }, 500),
    [getValues, setValue],
  );

  /***************
   * 原価の変更 */
  const handleChangeCostPrice = useCallback((rowIdx: number, value: number) => {
    const profitRate = getValues(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate')) / 100;
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));
    const costPrice = value;

    const {
      rowCostPrice,
      unitPrice,
      rowUnitPriceBeforeTax,
      rowUnitPriceAfterTax,
    } = calculateEstimateRow({
      costPrice,
      quantity,
      taxRate,
      profitRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.rowCostPrice'>(rowIdx, 'rowCostPrice'), rowCostPrice);
    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);
    setValue(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'), rowUnitPriceBeforeTax);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);
    handleUpdateSummary();
  }, [getValues, setValue, handleUpdateSummary]);

  /***************
   * 数量の変更 */
  const handleChangeQuantity = useCallback((rowIdx: number, value: number) => {
    const profitRate = getValues(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate')) / 100;
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const quantity = value;
    const costPrice = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'costPrice'));
    const unitPrice = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'unitPrice'));

    if (!quantity) return;

    const {
      rowCostPrice,
      rowUnitPriceBeforeTax,
      rowUnitPriceAfterTax,
    } = calculateEstimateRow({
      unitPrice,
      costPrice,
      quantity,
      taxRate,
      profitRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.rowCostPrice'>(rowIdx, 'rowCostPrice'), rowCostPrice);
    setValue(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'), rowUnitPriceBeforeTax);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);
    handleUpdateSummary();
  }, [getValues, setValue, handleUpdateSummary]);

  /*****************
   * 利益率の変更 */
  const handleChangeProfitRate = useCallback((rowIdx: number, value: number) => {
    const profitRate = value / 100;
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const costPrice = getValues(getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));

    const {
      unitPrice,
      rowUnitPriceAfterTax,
      rowUnitPriceBeforeTax,
    } = calculateEstimateRow({
      costPrice,
      quantity,
      taxRate,
      profitRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);
    setValue(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'), rowUnitPriceBeforeTax);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);
    handleUpdateSummary();
  }, [getValues, setValue, handleUpdateSummary]);

  /****************
   * 単価の変更 */
  const handleChangeUnitPrice = useCallback((rowIdx: number, value: number) => {
    const unitPrice = value;
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const costPrice = getValues(getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));

    const {
      rowUnitPriceBeforeTax,
      rowUnitPriceAfterTax,
      profitRate,
    } = calculateEstimateRow({
      unitPrice,
      costPrice,
      quantity,
      taxRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate'), roundTo(profitRate * 100, 2));
    setValue(getItemsFieldName<'items.0.rowUnitPriceBeforeTax'>(rowIdx, 'rowUnitPriceBeforeTax'), rowUnitPriceBeforeTax);
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);

    handleUpdateSummary();
  }, [getValues, setValue, handleUpdateSummary]);



  /************************
   * 金額（税抜き）の変更
   ************************/
  const handleChangeRowUnitPricBeforeTax = useCallback((rowIdx: number, value: number)=>{

    const rowUnitPriceBeforeTax = value;
    const taxRate = getValues('taxRate') / 100;
    const isTaxable = getValues(getItemsFieldName<'items.0.taxable'>(rowIdx, 'taxable'));
    const costPrice = getValues(getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'));
    const quantity = getValues(getItemsFieldName<'items.0.quantity'>(rowIdx, 'quantity'));

    const {
      unitPrice,
      profitRate,
      rowUnitPriceAfterTax,
    } = calculateEstimateRow({
      rowUnitPriceBeforeTax,
      costPrice,
      quantity,
      taxRate,
      isTaxable,
    });

    setValue(getItemsFieldName<'items.0.materialProfRate'>(rowIdx, 'materialProfRate'), roundTo(profitRate * 100, 2));
    setValue(getItemsFieldName<'items.0.rowUnitPriceAfterTax'>(rowIdx, 'rowUnitPriceAfterTax'), rowUnitPriceAfterTax);
    setValue(getItemsFieldName<'items.0.unitPrice'>(rowIdx, 'unitPrice'), unitPrice);
    handleUpdateSummary();
  }, [getValues, setValue, handleUpdateSummary]);

  return {
    handleUpdateSummary,
    handleChangeCostPrice,
    handleChangeQuantity,
    handleChangeProfitRate,
    handleChangeUnitPrice,
    handleChangeRowUnitPricBeforeTax,
    ...formReturn,
  };
};