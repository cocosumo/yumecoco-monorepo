import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';

export const useTypedFormContext = useFormContext<TypeOfForm>;