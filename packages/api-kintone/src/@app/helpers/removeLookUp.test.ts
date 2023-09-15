import { Properties } from '@kintone/rest-api-client/lib/src/client/types';
import { removeLookUp } from './removeLookUp';
import { describe, it, expect } from '@jest/globals';

describe('removeLookUp', () => {
  it('オブジェクト内のすべてのルックアップフィールドを削除すること', () => {
    const fields = {
      name: { lookup: 'level 1 name' },
      age: { lookup: 'level 1 age' },
      address: {
        fields: {
          post: { type: 'NUMBER' },
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

    const newFields = removeLookUp(fields as unknown as Properties);

    expect(newFields).toEqual({
      address: {
        fields: {
          post: { type: 'NUMBER' },
        },
      },
      friends: {
        fields: {},
      },
    });
  });
});