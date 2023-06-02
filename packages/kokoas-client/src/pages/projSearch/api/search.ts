import { fakerJA as faker } from '@faker-js/faker';
import { storeNamesAndpad } from 'api-andpad';
import format from 'date-fns/format';

const fakeDate = () => format(faker.date.past(), 'yyyy/MM/dd');

const fakeAddress = () => 
  '〒'
  + faker.location.zipCode()
  + faker.location.state() 
  + faker.location.city() 
  + faker.location.county()
  + faker.location.streetAddress();

export const search = async () => {

  return Array
    .from({ length: 50 })
    .map(() => ({
      custName: faker.person.fullName(),
      custNameKana: 'ココ二カナガヒョウジサレマス',
      custAddress: fakeAddress(),
      tel: faker.phone.number(),
      storeName: faker.helpers.arrayElement(storeNamesAndpad),
      contractDate: fakeDate(),
      projCompletedDate: fakeDate(),
      uuid: faker.database.mongodbObjectId(),
    }));

};

export type SearchResult = Awaited<ReturnType<typeof search>>; 