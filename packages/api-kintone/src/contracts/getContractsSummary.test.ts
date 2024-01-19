import { describe, it, expect } from '@jest/globals';
import { getContractById } from './getContractById';
import { getContractsSummary } from './getContractsSummary';
import { produce } from 'immer';


describe('getContractsSummary', () => {

  it('返金、減額、補助金を含む契約書の要約ができること', async () => {

    const contractDat = await getContractById('3bbf6f94-5958-4d7f-810c-a7891a722c36');

    const formalContract = produce(contractDat, draft => {
      // 本契約レコードを作成
      draft.contractType.value = '契約';
      draft.contractAddType.value = '';

      // 契約金額を設定
      draft.totalContractAmt.value = '5000000';

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
      draft.totalContractAmt.value = '50000';

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

    const contracts = [formalContract, addtionalContract];


    console.log('契約内容', contracts);

    const result = getContractsSummary(contracts);

    expect(result.契約金額税込).toBe(5000000);
    expect(result.追加金額税込).toBe(-10000);
    expect(result.合計受注金額税込).toBe(4990000);
    expect(result.税率).toBe(0.1);
    expect(result.返金).toBe(true);
    expect(result.返金Amt).toBe(50000);
    expect(result.減額).toBe(true);
    expect(result.減額Amt).toBe(10000);
    expect(result.補助金).toBe(true);
    expect(result.補助金Amt).toBe(33000);
  }, 60000);

  it('返金、減額を含む契約書の要約ができること', async () => {

    const contractDat = await getContractById('3bbf6f94-5958-4d7f-810c-a7891a722c36');

    const formalContract = produce(contractDat, draft => {
      // 本契約レコードを作成
      draft.contractType.value = '契約';
      draft.contractAddType.value = '';

      // 契約金額を設定
      draft.totalContractAmt.value = '3600000';

      // 返金を設定
      draft.hasRefund.value = 'はい';
      draft.refundAmt.value = '1500000';

      // 減額を設定
      draft.hasReduction.value = 'いいえ';
      draft.reductionAmt.value = '0';

      // 補助金を設定
      draft.hasSubsidy.value = 'いいえ';
      draft.subsidyAmt.value = '0';
    });

    const addtionalContract = produce(contractDat, draft => {
      // 追加契約を取得
      // 契約書区分の修正
      draft.contractType.value = '追加';
      draft.contractAddType.value = '減額工事';

      // 契約金額を設定
      draft.totalContractAmt.value = '-162683';

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

    const contracts = [formalContract, addtionalContract];


    console.log('契約内容', contracts);

    const result = getContractsSummary(contracts);

    expect(result.契約金額税込).toBe(3600000);
    expect(result.追加金額税込).toBe(-1662683);
    expect(result.合計受注金額税込).toBe(1937317);
    expect(result.税率).toBe(0.1);
    expect(result.返金).toBe(true);
    expect(result.返金Amt).toBe(1500000);
    expect(result.減額).toBe(true);
    expect(result.減額Amt).toBe(162683);
    expect(result.補助金).toBe(false);
    expect(result.補助金Amt).toBe(0);
  }, 60000);


  //　仕様参考 https://github.com/Lorenzras/yumecoco-monorepo/issues/817
  it('本契約無しで、設計契約のみだったら、設計契約金を「合計受注金額税込」に足す', async () => {
    const contractDat = await getContractById('3bbf6f94-5958-4d7f-810c-a7891a722c36');
    const planContract = produce(contractDat, (draft) => {
      draft.contractType.value = '設計契約';
      draft.contractAddType.value = '';
      draft.totalContractAmt.value = '100000';
      draft.refundAmt.value = '0';
      draft.reductionAmt.value = '0';
      draft.subsidyAmt.value = '0';
    });

    const result = getContractsSummary([planContract]);

    console.log(result);


    expect(result.契約金額税込).toBe(100000);  // K244 設計契約１つのみの工事は設計契約の金額を契約金額として計算してほしい
    expect(result.合計受注金額税込).toBe(100000);

  });

  it('本契約ありで「設計契約金が含まれていない」という設定の場合、設計契約金を「合計受注金額税込」に足す', async () => {
    const contractDat = await getContractById('3bbf6f94-5958-4d7f-810c-a7891a722c36');
    const planContract = produce(contractDat, (draft) => {
      draft.contractType.value = '設計契約';
      draft.contractAddType.value = '';
      draft.totalContractAmt.value = '100000';
      draft.refundAmt.value = '0';
      draft.reductionAmt.value = '0';
      draft.subsidyAmt.value = '0';
    });

    const formalContract = produce(contractDat, (draft) => {
      draft.contractType.value = '契約';
      draft.contractAddType.value = '';
      draft.totalContractAmt.value = '500000';
      draft.refundAmt.value = '0';
      draft.reductionAmt.value = '0';
      draft.subsidyAmt.value = '0';
      draft.includePlanContractAmt.value = '0'; // 「設計契約を含まない」
    });

    const result = getContractsSummary([planContract, formalContract]);

    console.log(result);

    expect(result.合計受注金額税込).toBe(600000);

  });

  it('本契約ありで「設計契約金が含まれている」という設定の場合、設計契約金を「合計受注金額税込」に足さない', async () => {
    const contractDat = await getContractById('3bbf6f94-5958-4d7f-810c-a7891a722c36');
    const planContract = produce(contractDat, (draft) => {
      draft.contractType.value = '設計契約';
      draft.contractAddType.value = '';
      draft.totalContractAmt.value = '100000';
      draft.refundAmt.value = '0';
      draft.reductionAmt.value = '0';
      draft.subsidyAmt.value = '0';
    });

    const formalContract = produce(contractDat, (draft) => {
      draft.contractType.value = '契約';
      draft.contractAddType.value = '';
      draft.totalContractAmt.value = '500000';
      draft.refundAmt.value = '0';
      draft.reductionAmt.value = '0';
      draft.subsidyAmt.value = '0';
      draft.includePlanContractAmt.value = '1'; // 「設計契約金が含まれている」
    });

    const result = getContractsSummary([planContract, formalContract]);

    console.log(result);

    expect(result.合計受注金額税込).toBe(500000);

  });
});
