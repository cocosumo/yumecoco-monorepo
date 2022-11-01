import 'regenerator-runtime/runtime';

import { updateGroup } from './PUT';
import { dtGroup } from './test/data';

describe('Customer Group', () => {

  test('is updated succesfully', async () => {
    await updateGroup(dtGroup)
      .then((resp) => {
        expect(resp); console.log(resp);
      })
      .catch((resp) => {
        console.log('エラー：', resp);
      });
  });
});