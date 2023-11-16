import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { convertPaymentsToJson } from './convertPaymentsToJson';
import { getAllContracts, getAllProjects, getAllStores, getEmployees } from 'api-kintone';
import { getMyOrders } from 'api-andpad';
import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';


describe('convertPaymentsToJson', () => {
  it('should convert payments data to JSON data', async () => {


    const [
      alertPayments,
      allProjects,
      allEmployees,
      allStores,
      allOrders,
      allContracts,
    ] = await Promise.all([
      getUnpaidAndpadPayments(),
      getAllProjects(),
      getEmployees(),
      getAllStores(),
      getMyOrders(),
      getAllContracts(),
    ]);

    const result = await convertPaymentsToJson({
      alertPayments: alertPayments,
      contracts: allContracts,
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
      path.join(dir, `convertPaymentsToJson_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
