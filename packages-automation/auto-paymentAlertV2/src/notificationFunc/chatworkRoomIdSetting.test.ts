import { describe, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { getEmployees, getProjById } from 'api-kintone';
import { chatworkRoomIdSetting } from './chatworkRoomIdSetting';


describe('chatworkRoomIdSetting', () => {
  it('should get chatwork roomID', async () => {

    const projId = 'adebcd51-aaea-4150-8b21-7373710408e2';

    const [
      tgtProject,
      allEmployees,
    ] = await Promise.all([
      getProjById(projId),
      getEmployees(),
    ]);

    const result = await chatworkRoomIdSetting({
      agents: tgtProject.agents,
      employees: allEmployees,
    });

    const dir = path.join(__dirname, '__TEST__');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // save json file
    fs.writeFileSync(
      path.join(dir, `chatworkRoomIdSetting_${projId}.json`),
      JSON.stringify(result, null, 2),
    );

  }, 60000);
});
