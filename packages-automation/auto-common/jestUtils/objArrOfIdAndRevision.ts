import { objWithIdAndRevision } from './objWithIdAndRevision';

export const objArrOfIdAndRevision = () =>
  expect.arrayContaining([objWithIdAndRevision()]);