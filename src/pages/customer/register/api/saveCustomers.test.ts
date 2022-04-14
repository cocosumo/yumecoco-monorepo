import { saveCustomers } from './saveCustomers';
import { CustomerForm } from '../form';

const testData: CustomerForm =  {
  store: '11',
  cocoAG1: '40',
  cocoAG2: '43',
  yumeAG1: '28',
  yumeAG2: '65',
  customers: [
    {
      key: '',
      custName: 'てすと',
      isSameAddress: true,
      custNameReading: 'テスト',
      gender: '女性',
      birthYear: '1995',
      birthMonth: '6',
      birthDay: '11',
      postal: '441-8124',
      address1: '愛知県豊橋市野依町',
      address2: '',
      phone1: '07014529634',
      phone1Type: '祖父母',
      phone2: '',
      phone2Type: '',
      email: 'lenzras@gmail.com',
      emailType: '',
    },
    {
      key: '',
      custName: 'てすと２',
      isSameAddress: false,
      custNameReading: 'テスト',
      gender: '女性',
      birthYear: '1995',
      birthMonth: '6',
      birthDay: '11',
      postal: '441-8134',
      address1: 'ててててて',
      address2: '',
      phone1: '07014529634',
      phone1Type: '祖父母',
      phone2: '',
      phone2Type: '',
      email: 'lenzras@gmail.com',
      emailType: '',
    },
  ],
} ;

test('Save', async ()=>{
  expect(await saveCustomers(testData)).toMatchSnapshot();
});