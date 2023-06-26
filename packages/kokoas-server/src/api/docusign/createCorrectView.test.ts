import { createCorrectView } from './createCorrectView';
import { describe, it, expect } from '@jest/globals';

describe('correctView', () => {

  it('修正ビューのURLをDocusignによって生成する', async () => {
    const result = await createCorrectView('dcdc8c8c-6d3b-413e-8498-29fa034c6e87')
      .catch((err) => {
        console.log('err', err);
      });
    console.log('result', result);

    expect(result).toHaveProperty('url');
  });
});