import 'regenerator-runtime/runtime';
import { getSpecifiedEmployees } from './GET';


describe('CustGroup', () => {
  it('has been searched', async ()=>{
    const res = await getSpecifiedEmployees({
      type: ['yumeAG'],
    });
    console.log('Retrieved', res.length);
    expect(res).toMatchSnapshot();
  });
});