import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { removeLookUp } from './removeLookUp';

describe('removeLookUp', () => {
  it('オブジェクト内のすべてのルックアップフィールドを再帰的に削除する', () => {
    const fields = {
      name: { lookup: 'level 1 name' },
      age: { lookup: 'level 1 age' },
      address: {
        fields: {
          street: { lookup: 'level 2 street' },
          city: { lookup: 'level 2 city' },
        },
      },
      friends: {
        fields: {
          name: { lookup: 'level 2 name' },
          age: { lookup: { value: 'level 2 name' } },
        },
      },
    };

    removeLookUp(fields as unknown as Properties);

    expect(fields).toEqual({
      address: {
        fields: {},
      },
      friends: {
        fields: {},
      },
    });
  });
});