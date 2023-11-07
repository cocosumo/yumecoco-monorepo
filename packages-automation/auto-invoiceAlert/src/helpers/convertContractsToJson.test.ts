import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { convertContractsToJson } from './convertContractsToJson';
import { getAllContracts, getAllProjects, getAllStores, getEmployees } from 'api-kintone';
import { getTargetAndpadOrders } from './getTargetAndpadOrders';


describe('convertContractsToJson', () => {
  it('should convert contract data to JSON data', async () => {

    // set output file of filterContractsByTargetProjType.test.ts
    const contractsPath = path.join(__dirname, './__TEST__/contracts.json');
    const contracts = JSON.parse(fs.readFileSync(contractsPath, 'utf8'));

    const [
      allProjects,
      allEmployees,
      allStores,
      allContracts,
    ] = await Promise.all([
      getAllProjects(),
      getEmployees(),
      getAllStores(),
      getAllContracts(),
    ]);

    const tgtOrders = await getTargetAndpadOrders({
      contracts: contracts,
      projects: allProjects,
    });

    const result = await convertContractsToJson({
      allContracts: allContracts,
      contracts: contracts,
      projects: allProjects,
      employees: allEmployees,
      stores: allStores,
      tgtOrders: tgtOrders,
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
