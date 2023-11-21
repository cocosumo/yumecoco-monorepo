import { describe, expect, it } from '@jest/globals';
import { getAllAndpadOrders } from 'api-andpad';
import { getAllRecords, updateAllRecords } from 'api-kintone/src';
import { AppIds } from 'config';
import { IProjects } from 'types';
import path from 'path';
import fs from 'fs';
import { KintoneClientBasicAuth } from './settings';

/*
 工事内容のandpadSystemIdを一括更新処理です。

 普段実行しませんが、andpadSystemIdに修正や問題があったら、
 当関数を必用に応じて、調整し、実行してください。

*/

describe('updateProjSystemIds', () => {
  it('should update project system ids', async () => {

    const projAppId = AppIds.projects;

    const [
      projectsWithoutForcedLinkedSystemIds,
      allAndpadOrders,
    ] = await Promise.all([
      getAllRecords<IProjects>({
        app: projAppId,
        condition:  'forceLinkedAndpadSystemId = ""', // Andpadへ強制接続以外の案件
      }),
      getAllAndpadOrders({
        q: '案件管理ID IS EXIST', // ココアスによって登録された案件のみ（標準接続）
      }),
    ]);

    expect(
      projectsWithoutForcedLinkedSystemIds
        .every(({ forceLinkedAndpadSystemId }) => !forceLinkedAndpadSystemId.value),
    ).toBeTruthy();

    const projectsWithSystemId = projectsWithoutForcedLinkedSystemIds
      .reduce((acc, cur) => {
        
        const andpadOrder = allAndpadOrders.data.objects
          .find(({ 案件管理ID }) => 案件管理ID === cur.uuid.value);

        if (andpadOrder) {
          acc.push({
            id: cur.$id.value,
            record: {
              andpadSystemId: {
                value: String(andpadOrder.システムID),
              },
            } as Partial<IProjects>,
          });
        }

        return acc;
      }, [] as Parameters<typeof updateAllRecords>[0]['records']);

    const dir = path.join(__dirname, '__TEST__');
    fs.writeFileSync(
      path.join(dir, `updateProjSystemIds_${new Date().getTime()}.json`),
      JSON.stringify(projectsWithSystemId, null, 2),
    );


    const updateResult = await KintoneClientBasicAuth.record.updateAllRecords({
      app: projAppId,
      records: projectsWithSystemId,
    })
      .catch((e) => {
        console.log(JSON.stringify(e, null, 2));
        throw e;
      });

    console.log(updateResult);
    


  }, 9000000);
});
