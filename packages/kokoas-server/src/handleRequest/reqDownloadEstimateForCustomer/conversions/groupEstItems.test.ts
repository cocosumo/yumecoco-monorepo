import { IProjestimates } from 'types';
import { groupEstItems } from './groupEstItems';
import { expect, describe, it } from '@jest/globals';

describe('groupedEstItems', () => {
  it('顧客用の見積書の内訳をグループ化する', () => {
    const estItems = [
      {
        value: {
          大項目: { value: '大項目1' },
          税率: { value: '0.1' },
          単価: { value: '1000' },
          原価: { value: '500' },
          数量: { value: '1' },
        },
      },
      {
        value: {
          大項目: { value: '大項目1' },
          税率: { value: '0.1' },
          単価: { value: '1000' },
          原価: { value: '500' },
          数量: { value: '1' },
        },
      },
      {
        value: {
          大項目: { value: '大項目2' },
          税率: { value: '0.1' },
          単価: { value: '1000' },
          原価: { value: '500' },
          数量: { value: '1' },
        },
      },
    ];

    // TODO: Improve mocking of data
    const groupedEstItems = groupEstItems(estItems as IProjestimates['内訳']['value']);

    console.log(JSON.stringify(groupedEstItems, null, 2));

    expect(groupedEstItems.map(([key]) => key)).toEqual(['大項目1', '大項目2']);
  });
});