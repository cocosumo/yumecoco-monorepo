import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';


export const useTypedFormContext = useFormContext<TypeOfForm>;

export const useTypedWatch = useWatch<TypeOfForm>;