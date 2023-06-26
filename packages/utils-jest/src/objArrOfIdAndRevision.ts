import { expect } from '@jest/globals';


import { objWithIdAndRevision } from './objWithIdAndRevision';

export const objArrOfIdAndRevision = () =>
  expect.arrayContaining([objWithIdAndRevision()]);