import 'regenerator-runtime/runtime';
import { convertToKintone, saveConstructionData } from './POST';
import { initialValues } from './../../../pages/construction/register/form'; //'src/pages/construction/register/form';

describe('Raw Values', ()=>{
  it('is converterd', ()=>{
    expect(convertToKintone(initialValues)).toMatchSnapshot();
  });

  it('is saved', ()=>{
    console.log(process.env.API_CONSTRUCTION_TYPE);
    expect(saveConstructionData(initialValues)).toMatchSnapshot();
  });
});
