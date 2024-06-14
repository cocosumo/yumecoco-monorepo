import { describe, it, expect } from '@jest/globals';
import { getContractById } from 'api-kintone';
import { produce } from 'immer';
import { getBillingItems } from './getBillingItems';


describe('getBillingItems', () => {

  it('複数契約書の内容から請求項目の作成ができること', async () => {

    const contractDat = await getContractById('3bbf6f94-5958-4d7f-810c-a7891a722c36');

    const formalContract = produce(contractDat, draft => {
      // 本契約レコードを作成
      draft.contractType.value = '契約';
      draft.contractAddType.value = '';

      // 契約金額を設定
      draft.totalContractAmt.value = '5000000';

      // 各支払い金額の設定
      draft.contractAmt.value = '1000000';
      draft.initialAmt.value = '200000';
      draft.interimAmt.value = '800000';
      draft.finalAmt.value = '2500000';
      draft.othersAmt.value = '500000';

      // 返金を設定
      draft.hasRefund.value = 'はい';
      draft.refundAmt.value = '50000';

      // 減額を設定
      draft.hasReduction.value = 'はい';
      draft.reductionAmt.value = '10000';

      // 補助金を設定
      draft.hasSubsidy.value = 'はい';
      draft.subsidyAmt.value = '33000';
    });


    const addtionalContract = produce(contractDat, draft => {
      // 追加契約を取得
      // 契約書区分の修正
      draft.contractType.value = '追加';
      draft.contractAddType.value = '追加工事';

      // 契約金額を設定
      draft.totalContractAmt.value = '500000';

      // 各支払い金額の設定
      draft.contractAmt.value = '0';
      draft.initialAmt.value = '0';
      draft.interimAmt.value = '0';
      draft.finalAmt.value = '0';
      draft.othersAmt.value = '500000';

      // 返金を設定
      draft.hasRefund.value = 'いいえ';
      draft.refundAmt.value = '0';

      // 減額を設定
      draft.hasReduction.value = 'いいえ';
      draft.reductionAmt.value = '0';

      // 補助金を設定
      draft.hasSubsidy.value = 'いいえ';
      draft.subsidyAmt.value = '0';
    });

    const addtionalContract2 = produce(contractDat, draft => {
      // 追加契約を取得
      // 契約書区分の修正
      draft.contractType.value = '追加';
      draft.contractAddType.value = '減額工事';

      // 契約金額を設定
      draft.totalContractAmt.value = '-500000';

      // 各支払い金額の設定
      draft.contractAmt.value = '0';
      draft.initialAmt.value = '0';
      draft.interimAmt.value = '0';
      draft.finalAmt.value = '0';
      draft.othersAmt.value = '-500000';

      // 返金を設定
      draft.hasRefund.value = 'いいえ';
      draft.refundAmt.value = '0';

      // 減額を設定
      draft.hasReduction.value = 'いいえ';
      draft.reductionAmt.value = '0';

      // 補助金を設定
      draft.hasSubsidy.value = 'いいえ';
      draft.subsidyAmt.value = '0';
    });
    const contracts = [formalContract, addtionalContract, addtionalContract2];

    const result = getBillingItems({
      contracts,
    });

    console.log('結果', result);

    expect(result.length).toBe(9);
    expect(result[0].contractType).toBe('契約');
    expect(result[0].amount).toBe(1000000);
    expect(result[0].label).toBe('契約金');
    expect(result[5].contractType).toBe('契約');
    expect(result[5].amount).toBe(50000);
    expect(result[5].label).toBe('返金');
    expect(result[8].contractType).toBe('追加2');
    expect(result[8].amount).toBe(-500000);
    expect(result[8].label).toBe('その他');
  }, 60000);

});
