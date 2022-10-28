import { searchCustomers } from './searchCustomers';

const toContain = (
  {
    storeName,
    members: { value: groupMembers },
  } : TypeOfCustomerGroup,
  { mainSearch } : Parameters<typeof searchCustomers>[number],
) => {

  return (
    storeName.value.includes(mainSearch) ||
    groupMembers.some(({ value: { customerName } }) => customerName.value.includes(mainSearch) )
  );
};

describe('mainSearch', ()=>{
  it('should return records with mainSearch', async () => {
    const testParams : Parameters<typeof searchCustomers>[number][] = [
      { mainSearch: '豊田' },
      { mainSearch: 'test' },
    ];

    for (const param of testParams) {
      const result = await searchCustomers(param);
      console.log(`Records: ${result.length} , ${param.mainSearch}`);
      expect(
        result
          .every((rec) => toContain(rec, param)),
      )
        .toBe(true);
    }
  });

});