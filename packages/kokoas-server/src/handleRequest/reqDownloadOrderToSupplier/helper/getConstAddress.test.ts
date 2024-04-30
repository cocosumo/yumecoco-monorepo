import { describe, expect, it } from '@jest/globals';
import { getConstAddress } from './getConstAddress';
import { getProjById } from 'api-kintone';
import { IProjects } from 'types';


describe('getConstAddress', () => {

  it('仮有かつ確定後の場合は確定後住所を返す', async () => {
    const testId = 'adebcd51-aaea-4150-8b21-7373710408e2';
    const projRec = await getProjById(testId);

    const result = getConstAddress(projRec);

    expect(result).toBe(`${projRec.finalAddress1.value}${projRec.finalAddress2.value}`);
  });

  it('仮無しの場合はベース住所を返す', async () => {
    const testId = '66bc6fc7-0ace-45b8-9b58-84ba5da195d0';
    const projRec = await getProjById(testId);

    const result = getConstAddress(projRec);

    expect(result).toBe(`${projRec.address1.value}${projRec.address2.value}`);
  });

  it('空の場合、0を返す', async () => {
    const projRec = undefined;

    const result = getConstAddress(projRec as unknown as IProjects);

    expect(result).toBe('');
  });
});