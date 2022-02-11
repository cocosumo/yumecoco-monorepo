import 'regenerator-runtime/runtime';

import { addCustGroup } from './POST';

describe('Customer Group', () => {
  test('is added succesfully', async () => {
    expect(await addCustGroup({
      storeId: { value: 21 },
    })).toHaveProperty('revision');
  });
});