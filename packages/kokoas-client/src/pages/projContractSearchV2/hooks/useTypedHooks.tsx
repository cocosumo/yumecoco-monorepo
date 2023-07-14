import { useFormContext, useWatch } from 'react-hook-form';
import { TForm } from '../schema';
import { useURLParamsV2 } from 'kokoas-client/src/hooks';

export const useTypedFormContext = useFormContext<TForm>;
export const useTypedWatch = useWatch<TForm>;

export const useTypedURLParams = useURLParamsV2<TForm>;