import { isEven } from 'is-even';
import { Test } from 'types';

export const importedType: Test = 'hello';
export const isOdd = (x: number) => !isEven(x);