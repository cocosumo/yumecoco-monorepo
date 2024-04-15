import { useSaveOrder, useSaveOrderBudget } from 'kokoas-client/src/hooksQuery';
import { useOrderFormContext } from './useOrderRHF';
import { SubmitHandler } from 'react-hook-form';
import { TOrderForm } from '../schema';
import { useCallback } from 'react';

export const useSaveOrderOrderRequest = () => {
  const { handleSubmit } = useOrderFormContext();
  const { mutateAsync: saveOrderBudget } = useSaveOrderBudget();
  const { mutateAsync: saveOrder } = useSaveOrder();

  const onSubmitValid: SubmitHandler<TOrderForm> = useCallback(async (data) => {
    
  }, []);

};