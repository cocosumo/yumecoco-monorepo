import { useFormContext, useWatch } from 'react-hook-form';
import { TInvoiceForm } from '../schema';

export const useInvoiceFormContext = useFormContext<TInvoiceForm>;

export const useInvoiceWatch = useWatch<TInvoiceForm>;