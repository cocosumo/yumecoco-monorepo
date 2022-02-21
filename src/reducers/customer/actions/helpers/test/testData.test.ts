import { faker } from '@faker-js/faker';
faker.locale = 'ja';

test('is fake', ()=>{
  const name = `${faker.name.lastName()} ${faker.name.firstName()}`;
  console.log(name);
  expect(name);
});