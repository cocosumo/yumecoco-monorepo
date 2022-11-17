import { IProjects } from 'types';
import { getProjects } from './getProjects';

describe('getProjects', () => {
  const limit = 10;
  let recs: IProjects[] = [];

  beforeAll(async () =>{
    const { records } = await getProjects({
      query: `order by 更新日時 desc limit ${limit}`,
    });
    recs = records;
  });

  it('should get correct number of records when limit is defined', () =>{
    console.log(`result：${recs.length} = limit : ${limit}`);
    expect(recs.length).toEqual(limit);
  });
});