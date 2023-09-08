import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { convertContractsToRemainder } from './convertContractsToRemainder';
import { extractUpdatedRecords } from './extractUpdatedRecords';
import { getAllProjects, getAllPaymentRemainder, getAllAndpadPayments, getUsers } from 'api-kintone';


describe('convertContractsToRemainder', () => {
  it('should convert contracts to Remainder app', async () => {

    const tgtProjTypeContracts = await extractUpdatedRecords();
    const allProjects = await getAllProjects();
    const allRemainders = await getAllPaymentRemainder();
    const allAndpadPayments = await getAllAndpadPayments();
    const allUsers = await getUsers();

    const result = await convertContractsToRemainder({
      projTypeContracts: tgtProjTypeContracts,
      projects: allProjects,
      remainders: allRemainders,
      andpadPayments: allAndpadPayments,
      users: allUsers,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `convertContractsToRemainder_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
