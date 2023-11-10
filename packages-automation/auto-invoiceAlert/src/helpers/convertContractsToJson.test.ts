import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { convertContractsToJson } from './convertContractsToJson';
import { getAllContracts, getAllProjects, getAllStores, getEmployees } from 'api-kintone';
import { getAllAndpadOrders } from 'api-andpad';


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
      allOrders,
    ] = await Promise.all([
      getAllProjects(),
      getEmployees(),
      getAllStores(),
      getAllContracts(),
      getAllAndpadOrders({ beforeInvoiceIssue: true }),
    ]);

    const result = convertContractsToJson({
      allContracts: allContracts,
      contracts: contracts,
      projects: allProjects,
      employees: allEmployees,
      stores: allStores,
      allOrders: allOrders,
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
