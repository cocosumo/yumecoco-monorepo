import { describe, it, expect } from '@jest/globals';
import { calcProfitability } from './calcProfitability';


describe('calcProfitability', () => {
  const testData = {
    orderAmount: 20636364,
    additionalAmount: 1363636,
    purchaseAmount: 16041147,
    paymentAmount: 16041147,
    depositAmount: 24200000,
    yumeCommFeeRate: 19,
    tax: 0.1,
  };

  const {
    orderAmount,
    additionalAmount,
    purchaseAmount,
    paymentAmount,
    予定利益率,
    実利益率,
    yumeProfitSharing,
    cocoProfitSharing,
    実利益税抜_夢てつ,
    実利益税抜_ここすも,
    受注額計_税込,
    受注額計_税抜,
    入金額,
    未入金,
  } = calcProfitability(testData);



  it('正しい「発注金額」を返す', () => {
    expect(orderAmount).toBe(20636364);
  });

  it('正しい「追加金額」を返す', () => {
    expect(additionalAmount).toBe(1363636);
  });

  it('正しい「発注金額」を返す', () => {
    expect(purchaseAmount).toBe(16041147);
  });

  it('正しい「支払金額」を返す', () => {
    expect(paymentAmount).toBe(16041147);
  });

  it('正しい「予定利益率」を返す', () => {
    expect(予定利益率).toBe(27.09);
  });

  it('正しい「実利益率」を返す', () => {
    expect(実利益率).toBe(27.09);
  });

  it('正しい「ゆめてつ利益配分」を返す', () => {
    expect(yumeProfitSharing).toBe(19);
  });

  it('正しい「ここすも利益配分」を返す', () => {
    expect(cocoProfitSharing).toBe(81);
  });

  it('正しい「実利益税抜_夢てつ」を返す', () => {
    expect(実利益税抜_夢てつ).toBe(1132182);
  });

  it('正しい「実利益税抜_ここすも」を返す', () => {
    expect(実利益税抜_ここすも).toBe(4826671);
  });

  it('正しい「受注額計_税込」を返す', () => {
    expect(受注額計_税込).toBe(24200000);
  });

  it('正しい「受注額計_税抜」を返す', () => {
    expect(受注額計_税抜).toBe(22000000);
  });

  it('正しい「入金額」を返す', () => {
    expect(入金額).toBe(24200000);
  });

  it('正しい「未入金額」を返す', () => {
    expect(未入金).toBe(0);
  });


});