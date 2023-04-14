import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { getLookUp } from './getLookUp';

describe('getLookUp', () => {
  it('オブジェクト内のすべてのルックアップフィールドを再帰的に返す必要があります', () => {
    const fields = {
      name: { lookup: 'level 2 name' },
      age: { lookup: 'level 2 age' },
      address: {
        fields: {
          street: { lookup: 'level 3 street' },
          city: { lookup: 'level 3 city' },
        },
      },
      friends: {
        fields: {
          name: { lookup: 'level 3 name' },
          age: { lookup: { value: 'level 3 name' } },
        },
      },
    };
    
    // 実際の型ではないので、キャストします。
    // 目的はどの深さでもlookupフィールドを取得することです。
    const result = getLookUp(fields as unknown as Properties);

    expect(result).toHaveLength(6);
    expect(result).toContainEqual(fields.name);
    expect(result).toContainEqual(fields.address.fields.street);
    expect(result).toContainEqual(fields.friends.fields.name);
  });
});