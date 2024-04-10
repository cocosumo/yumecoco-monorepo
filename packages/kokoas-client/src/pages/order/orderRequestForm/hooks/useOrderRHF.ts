import { useFormContext, useWatch } from 'react-hook-form';
import { TOrderForm } from '../schema';

export const useOrderFormContext = useFormContext<TOrderForm>;

export const useOrderWatch = useWatch<TOrderForm>;