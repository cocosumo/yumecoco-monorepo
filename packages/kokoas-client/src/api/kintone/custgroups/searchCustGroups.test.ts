import { ICustgroups, KCustGroupAgents, KCustGroupMembers, TAgents } from 'types';
import { searchCustomers } from './searchCustGroups';

const membersContain = (
  members: ICustgroups['members'],
  fields: KCustGroupMembers[],
  value: string,
) => {
  return (
    members.value
      .some(({ value: row }) => fields
        .some(fieldKey => row[fieldKey].value.includes(value)),
      )
  );
};

const agentContains = (
  agents: ICustgroups['agents'],
  fields: KCustGroupAgents[],
  value: string,
  agentType: TAgents,
) => {
  return (
    agents.value
      .some(({ value: row }) => fields
        .some(fieldKey => {
          return row[fieldKey].value.includes(value)
          && row.agentType.value === agentType;
        } ),
      )
  );
};


const toContain = (
  {
    storeName,
    members: { value: groupMembers },
    agents: { value: groupAgents },
  } : ICustgroups,
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

  it('should return records matching custEmail', async () => {
    const testParams : Parameters<typeof searchCustomers>[number][] = [
      { custEmail: 'gmail' },
    ];

    for (const param of testParams) {
      const result = await searchCustomers(param);
      console.log(`Records: ${result.length} , ${param.custEmail}`);

      expect(
        result
          .every(({ members }) => membersContain(members, ['dump'], param.custEmail || '')),

      )
        .toBe(true);
    }
  });


  it('should return records matching yumeAG', async () => {
    const testParams : Parameters<typeof searchCustomers>[number][] = [
      { yumeAg: '高野' },
    ];

    for (const param of testParams) {
      const result = await searchCustomers(param);
      console.log(`Records: ${result.length} , ${param.yumeAg}`);
      expect(
        result
          .every(({ agents }) => agentContains(agents, ['employeeName'], param.yumeAg || '', 'yumeAG')),
      )
        .toBe(true);
    }
  });

  it('should return records matching cocoAG', async () => {
    const testParams : Parameters<typeof searchCustomers>[number][] = [
      { cocoAg: '隆仁' },
    ];

    for (const param of testParams) {
      const result = await searchCustomers(param);
      console.log(`Records: ${result.length} , ${param.cocoAg}`);

      expect(
        result
          .every(({ agents }) => agentContains(agents, ['employeeName'], param.cocoAg || '', 'cocoAG')),
      )
        .toBe(true);
    }
  });



});