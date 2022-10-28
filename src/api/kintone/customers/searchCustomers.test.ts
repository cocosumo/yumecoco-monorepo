import { searchCustomers } from './searchCustomers';

const toContain = (
  {
    storeName,
    members: { value: groupMembers },
    agents: { value: groupAgents },
  } : TypeOfCustomerGroup,
  { easySearch = '' } : Parameters<typeof searchCustomers>[number],
) => {

  return (
    storeName.value.includes(easySearch)
    || groupMembers
      .some(({ value: { customerName, dump } }) => {
        return (
          customerName.value.includes(easySearch)
          || dump.value.includes(easySearch)
        );
      } )
    || groupAgents.some(({ value: { employeeName } }) => employeeName.value.includes(easySearch) )
  );
};

describe('mainSearch', ()=>{
  it('should return records matching easySearch', async () => {
    const testParams : Parameters<typeof searchCustomers>[number][] = [
      { easySearch: '豊田' },
      { easySearch: 'test' },
      { easySearch: '沖永' },
      { easySearch: 'gmail' },
    ];

    for (const param of testParams) {
      const result = await searchCustomers(param);
      console.log(`Records: ${result.length} , ${param.easySearch}`);
      expect(
        result
          .every((rec) => toContain(rec, param)),
      )
        .toBe(true);
    }
  });

  it('should return records matching storeName', async () => {
    const testParams : Parameters<typeof searchCustomers>[number][] = [
      { storeName: '豊田' },
    ];

    for (const param of testParams) {
      const result = await searchCustomers(param);
      console.log(`Records: ${result.length} , ${param.storeName}`);

      expect(
        result
          .every(({ storeName }) => storeName.value.includes(param.storeName || '')),
      )
        .toBe(true);
    }
  });

});