import 'regenerator-runtime/runtime';
import { convertToKintone, saveConstructionData } from './POST';
import { initialValues } from '../../../pages/projRegister/form'; //'src/pages/construction/register/form';

describe('Raw Values', ()=>{
  it('is converterd', ()=>{
    expect(convertToKintone(initialValues)).toMatchSnapshot();
  });

  it('is saved', async ()=>{
    console.log(process.env.API_CONSTRUCTION_DETAILS);
    expect(await saveConstructionData(initialValues)).toMatchSnapshot();
  });
});
