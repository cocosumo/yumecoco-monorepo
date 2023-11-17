import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from 'date-fns/format';
import { convertReminderToJson } from './convertReminderToJson';
import { getAllAndpadPayments, getAllProjects } from 'api-kintone';


describe('convertReminderToJson', () => {
  it('should convert reminder data to JSON data', async () => {

    // set output file of getPaymentRemindersByAlertDate.test.ts
    const remindersPath = path.join(__dirname, '../api-kintone/__TEST__/reminders.json');
    const reminders = JSON.parse(fs.readFileSync(remindersPath, 'utf8'));

    // set output file of getAllAndpadOrders.test.ts
    const andpadOrdersPath = path.join(__dirname, './__TEST__/getAllOrders.json');
    const andpadOrders = JSON.parse(fs.readFileSync(andpadOrdersPath, 'utf8'));    


    const [
      allAndpadPayments,
      allProjects,
    ] = await Promise.all([
      getAllAndpadPayments(),
      getAllProjects(),
    ]);

    const result = convertReminderToJson({
      reminders: reminders,
      andpadPayments: allAndpadPayments,
      allAndpadOrders: andpadOrders,
      allProjects: allProjects,
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
