import { objWithIdAndRevision } from './objWithIdAndRevision';
import { expect } from '@jest/globals';

export const objArrOfIdAndRevision = () =>
  expect.arrayContaining([objWithIdAndRevision()]);