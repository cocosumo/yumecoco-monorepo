import { IProjestimates } from 'types';
import { groupEstItems } from './groupEstItems';

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

    expect(groupedEstItems)
      .toEqual({
        大項目1: {
          value: 2200,
          items: [
            {
              大項目: { value: '大項目1' },
              税率: { value: '0.1' },
              単価: { value: '1000' },
              原価: { value: '500' },
              数量: { value: '1' },
            },
            {
              大項目: { value: '大項目1' },
              税率: { value: '0.1' },
              単価: { value: '1000' },
              原価: { value: '500' },
              数量: { value: '1' },
            },
          ],
          
        },
        大項目2: {
          value: 1100,
          items: [
            {
              大項目: { value: '大項目2' },
              税率: { value: '0.1' },
              単価: { value: '1000' },
              原価: { value: '500' },
              数量: { value: '1' },
            },
          ],
        },
      });
  });
});