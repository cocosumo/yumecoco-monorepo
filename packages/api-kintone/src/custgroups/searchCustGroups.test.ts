import { ICustgroups, KCustGroupAgents, TAgents } from 'types';
import { searchCustGroups } from './searchCustGroups';

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
  { easySearch = '' } : Parameters<typeof searchCustGroups>[number],
) => {

  return (
    storeName.value.includes(easySearch)
    || groupMembers
      .some(({ value: { customerName } }) => {
        return (
          customerName.value.includes(easySearch)
        );
      } )
    || groupAgents.some(({ value: { employeeName, email } }) => {
      return employeeName.value.includes(easySearch) ||
      email.value.includes(easySearch);
    } )
  );
};

describe('mainSearch', ()=>{
  it('should return records matching easySearch', async () => {
    const testParams : Parameters<typeof searchCustGroups>[number][] = [
      { easySearch: '豊田' },
      { easySearch: 'test' },
      { easySearch: '沖永' },
      { easySearch: 'gmail' },
    ];

    for (const param of testParams) {
      const result = await searchCustGroups(param);

      expect(
        result
          .every((rec) => toContain(rec, param)),
      )
        .toBe(true);
    }
  });

  it('should return records matching storeName', async () => {
    const testParams : Parameters<typeof searchCustGroups>[number][] = [
      { storeName: '豊田' },
    ];

    for (const param of testParams) {
      const result = await searchCustGroups(param);
      expect(
        result
          .every(({ storeName }) => storeName.value.includes(param.storeName || '')),
      )
        .toBe(true);
    }
  });


  it('should return records matching yumeAG', async () => {
    const testParams : Parameters<typeof searchCustGroups>[number][] = [
      { yumeAG: '高野' },
    ];

    for (const param of testParams) {
      const result = await searchCustGroups(param);
      expect(
        result
          .every(({ agents }) => agentContains(agents, ['employeeName'], param.yumeAG || '', 'yumeAG')),
      )
        .toBe(true);
    }
  });

  it('should return records matching cocoAG', async () => {
    const testParams : Parameters<typeof searchCustGroups>[number][] = [
      { cocoAG: '隆仁' },
    ];

    for (const param of testParams) {
      const result = await searchCustGroups(param);

      expect(
        result
          .every(({ agents }) => agentContains(agents, ['employeeName'], param.cocoAG || '', 'cocoAG')),
      )
        .toBe(true);
    }
  });



});