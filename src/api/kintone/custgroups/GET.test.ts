import 'regenerator-runtime/runtime';
import { searchCustGroup } from './GET';


describe('CustGroup', () => {
  it('has been searched', async ()=>{
    const res = await searchCustGroup('斎藤');
    console.log(res.records[0], 'hello');
    expect(res).toHaveProperty('records');
  });
});