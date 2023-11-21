import { describe, expect, it } from '@jest/globals';
import { getAllAndpadOrders } from 'api-andpad';
import { getAllRecords } from 'api-kintone/src';
import { AppIds } from 'config';
import { IProjects } from 'types';

/*
 システムIDを一括更新バッチです。

 普段実行しませんが、修正や問題があったら、
*/

describe('updateProjSystemIds', () => {
  it('should update project system ids', async () => {

    const [
      projectsWithoutForcedLinkedSystemIds,
      allAndpadOrders,
    ] = await Promise.all([
      getAllRecords<IProjects>({
        app: AppIds.projects,
        condition: 'forceLinkedAndpadSystemId = ""',
      }),
      getAllAndpadOrders({ beforeInvoiceIssue: false }),
    ]);

    
    console.log('Length', allAndpadOrders.data.objects.length, allAndpadOrders.data.total);

    expect(
      projectsWithoutForcedLinkedSystemIds
        .every(({ forceLinkedAndpadSystemId }) => !forceLinkedAndpadSystemId.value),
    ).toBeTruthy();


  }, 9000000);
});