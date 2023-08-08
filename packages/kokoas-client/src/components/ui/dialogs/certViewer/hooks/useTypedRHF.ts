import { useFormContext } from 'react-hook-form';
import { TForm } from '../schema';

export const useTypedFormContext = useFormContext<TForm>;