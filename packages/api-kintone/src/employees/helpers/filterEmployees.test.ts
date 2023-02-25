import { EmpAffiliations, IEmployees, Territory } from 'types';
import { getEmployees } from '../getEmployees';
import { filterEmployees } from './filterEmployees';

describe('filterEmployees', () => {
  let employees: IEmployees[] = [];

  beforeAll(async () => {
    employees = await getEmployees(true);
  });

  it('should return all cocoAG when territory and store is not defined.', () => {
    const result = filterEmployees(
      employees,
      {
        agentType: 'cocoAG',
      });

    const isMatch = result
      .every(({ affiliation }) => (affiliation.value as EmpAffiliations) === 'ここすも' );

    console.log(`cocoAG Length: ${result.length}`);
    expect(isMatch).toBe(true);
  });

  it('should return all yumeAG when territory and store is not defined.', () => {
    const result = filterEmployees(
      employees,
      {
        agentType: 'yumeAG',
      });

    const isMatch = result
      .every(({ affiliation }) => (affiliation.value as EmpAffiliations) === 'ゆめてつ' );

    console.log(`yumeAG Length: ${result.length}`);
    expect(isMatch).toBe(true);
  });

  it('should return cocoAG of 東 territory', () => {
    const result = filterEmployees(employees, {
      agentType: 'cocoAG',
      territory: '東',
    });

    console.log(`[cocoAG, 東] Length: ${result.length}`);

    const isMatch = result
      .every(({
        territory_v2: territory,
        affiliation,
      }) => (territory.value as Territory) === '東'  && (affiliation.value as EmpAffiliations) === 'ここすも');

    expect(isMatch).toBe(true);
  });

  it('should return yumeAG of 東 territory with specified storeId', () => {
    const toyokawaStoreId = '83128853-98af-47af-9e5a-9d711bee4a43'; // https://rdmuhwtt6gx7.cybozu.com/k/19/show#record=12
    const result = filterEmployees(employees, {
      agentType: 'yumeAG',
      territory: '東',
      storeId: toyokawaStoreId,
    });

    console.log(`[yumeAG, 東] Length: ${result.length}`);

    console.log(result);

    const isMatch = result
      .every(({
        mainStoreId_v2: mainStoreId,
        affStores,
        territory_v2: territory,
        affiliation,
      }) => (territory.value as Territory) === '東'
        && (affiliation.value as EmpAffiliations) === 'ゆめてつ'
        && ( mainStoreId.value === toyokawaStoreId || affStores.value.some(({ value: { affStoreId } }) => affStoreId.value === toyokawaStoreId) ),
      );

    expect(isMatch).toBe(true);
  });

  it('should return yumeAG of 西 territory with that matches any of storeId[]', () => {
    const storeIds = [
      '83128853-98af-47af-9e5a-9d711bee4a43', // 豊川中央店 https://rdmuhwtt6gx7.cybozu.com/k/19/show#record=12
      'df176cb7-b731-466b-a354-a1cd5cc8f748', // 豊田中央店 https://rdmuhwtt6gx7.cybozu.com/k/19/show#record=13
    ];
    const result = filterEmployees(employees, {
      agentType: 'yumeAG',
      territory: '西',
      storeId: storeIds,
    });

    console.log(`[yumeAG, 西] Length: ${result.length}`);

    console.log(result);

    const isMatch = result
      .every(({
        mainStoreId_v2: mainStoreId,
        affStores,
        territory_v2: territory,
        affiliation,
      }) => (territory.value as Territory) === '西'
        && (affiliation.value as EmpAffiliations) === 'ゆめてつ'
        && (storeIds
          .some((storeId) => (
            mainStoreId.value === storeId
              || affStores.value
                .some(({ value: { affStoreId: _storeId } }) => _storeId.value === storeId )
          ))
        ),
      );

    expect(isMatch).toBe(true);
  });
});