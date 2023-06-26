import { getCorrectViewUrl } from './getCorrectViewUrl';
import { describe, it, expect } from '@jest/globals';

describe('getCorrectViewUrl', () => {
  it('修正画面のURLを取得できる', async () => {
    /**
     * Note:
     * ドキュメントにないですが、修正ビューURLを生成したあと、また生成したら、前のURLが無効になります。
     * よって、キャッシュするかどうか検証中。
     */
    const envelopeId = 'dcdc8c8c-6d3b-413e-8498-29fa034c6e87';

    const result = await getCorrectViewUrl({ envelopeId });

    console.log(result);

    expect(typeof result.url).toBe('string');
  
  });
});