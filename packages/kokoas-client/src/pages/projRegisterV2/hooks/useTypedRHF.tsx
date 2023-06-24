import { useFormContext, useWatch } from 'react-hook-form';
import { TForm } from '../schema';

/** 
 * RHF Wrappers to avoid type import hell
 */

export const useTypedFormContext = useFormContext<TForm>;

export const useTypedWatch = useWatch<TForm>;

