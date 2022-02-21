import 'regenerator-runtime/runtime';

import { addMemo } from './POST';

describe('Memo', () => {
  test('is added', async () => {
    return addMemo(
      {
        groupId: { value: '130' },
        notifRecipient: { value: [{ code: '' }] },
      } as CustomerMemoTypes.SavedData,
    ).then((result) => {
      console.log(result);
      expect(result).toHaveProperty('id');
    });
  });

});


