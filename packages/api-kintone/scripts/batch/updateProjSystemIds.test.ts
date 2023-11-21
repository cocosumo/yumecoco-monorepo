import { describe, expect, it } from '@jest/globals';
import { getAllAndpadOrders } from 'api-andpad';
import { getAllRecords } from 'api-kintone/src';
import { AppIds } from 'config';
import { IProjects } from 'types';

/*
 システムIDを一括更新処理です。

 普段実行しませんが、andpadSystemIdに修正や問題があったら、
 当関数を必用に応じて、調整し、実行してください。

*/

describe('updateProjSystemIds', () => {
  it('should update project system ids', async () => {

    const [
      projectsWithoutForcedLinkedSystemIds,
      allAndpadOrders,
    ] = await Promise.all([
      getAllRecords<IProjects>({
        app: AppIds.projects,
        condition: 'forceLinkedAndpadSystemId = ""', // Andpadへ強制接続以外の案件
      }),
      getAllAndpadOrders({
        q: '案件管理ID IS EXIST', // ココアスによって登録された案件のみ（標準接続）
      }),
    ]);

    

    
    console.log('Length', allAndpadOrders.data.objects.length, allAndpadOrders.data.total);

    expect(
      projectsWithoutForcedLinkedSystemIds
        .every(({ forceLinkedAndpadSystemId }) => !forceLinkedAndpadSystemId.value),
    ).toBeTruthy();


  }, 9000000);
});