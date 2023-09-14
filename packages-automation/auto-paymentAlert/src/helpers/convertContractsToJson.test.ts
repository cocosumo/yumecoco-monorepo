import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { convertContractsToJson } from './convertContractsToJson';
import { getAllProjects, getUsers } from 'api-kintone';


describe('convertContractsToJson', () => {
  it('should convert contract data to JSON data', async () => {

    // set output file of filterContractsByTargetProjType.test.ts
    const contractsPath = path.join(__dirname, './__TEST__/contracts.json');
    const contracts = JSON.parse(fs.readFileSync(contractsPath, 'utf8'));

    const allProjects = await getAllProjects();
    const allUsers = await getUsers();

    const result = await convertContractsToJson({
      contracts: contracts,
      projects: allProjects,
      users: allUsers,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `convertContractsToJson_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
