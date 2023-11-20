import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { convertRemindersToJson } from './convertRemindersToJson';
import { getAllAndpadPayments, getAllContracts, getAllProjects, getAllStores, getEmployees } from 'api-kintone';


describe('convertReminderToJson', () => {
  it('should convert reminder data to JSON data', async () => {

    // set output file of getPaymentRemindersByAlertDate.test.ts
    const remindersPath = path.join(__dirname, '../api-kintone/__TEST__/reminders.json');
    const reminders = JSON.parse(fs.readFileSync(remindersPath, 'utf8'));


    const [
      allAndpadPayments,
      allProjects,
      contracts,
      employees,
      stores,
    ] = await Promise.all([
      getAllAndpadPayments(),
      getAllProjects(),
      getAllContracts(),
      getEmployees(),
      getAllStores(),
    ]);

    const result = convertRemindersToJson({
      reminders: reminders,
      andpadPayments: allAndpadPayments,
      allProjects: allProjects,
      contracts,
      employees,
      stores,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `convertReminderToJson_${format(new Date(), 'yyyyMMddHHmmss')}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 100000);
});
