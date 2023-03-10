import { RecordType } from './config';
import { getContracts } from './getContracts';

describe('getContracts', () => {
  const limit = 5;

  let records: RecordType[] = [];
  beforeAll(async () => {
    const result = await getContracts({
      limit,
    });
    records = result.records;
  });

  it('should only get completed contracts only', () => {

    const isContract = records.every(({ envStatus }) => envStatus.value === 'completed' );

    expect(isContract).toBe(true);
  });

  it('should get contracts based on limit', () => {
    expect(records.length === limit).toBe(true);
  });
});