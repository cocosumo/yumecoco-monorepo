import { useFormContext, useWatch } from 'react-hook-form';
import { TForm } from '../schema';

export const useTypedFormContext = useFormContext<TForm>;

export const useTypedWatched = useWatch<TForm>;