import 'regenerator-runtime/runtime';
import { convertToKintone } from './POST';
import { initialValues } from '../../../pages/projRegister/form'; //'src/pages/construction/register/form';

describe('Raw Values', ()=>{
  it('is converterd', ()=>{
    expect(convertToKintone(initialValues)).toMatchSnapshot();
  });

});
