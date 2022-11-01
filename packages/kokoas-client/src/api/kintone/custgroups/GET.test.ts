import 'regenerator-runtime/runtime';
import { searchCustGroup } from './GET';


describe('CustGroup', () => {
  it('has been searched', async ()=>{
    const res = await searchCustGroup('高橋');
    console.log(res, 'hello');
    expect(res).toHaveProperty('records');
  });
});