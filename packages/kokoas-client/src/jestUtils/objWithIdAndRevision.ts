import {  expect } from '@jest/globals';


export const objWithIdAndRevision = () => expect.objectContaining({
  id: expect.any(String),
  revision: expect.any(String),
});