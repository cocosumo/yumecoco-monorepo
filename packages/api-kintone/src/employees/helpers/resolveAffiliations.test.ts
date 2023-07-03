import { resolveAffiliations } from '.';
import { describe, it, expect } from '@jest/globals';

describe('resolveAffiliations', () => {
  it('should resolve affiliation of a single agent', () => {
    expect(resolveAffiliations('cocoConst')).toBe(['ここすも']);
  });

  it('should resolve affiliations of an array of agents', () => {
    expect(resolveAffiliations(['yumeAG', 'cocoAG', 'cocoConst'])).toBe(['ゆめてつ', 'ここすも']);
  });

  it('should resolve unique affiliations of an array of agents with duplicates', () => {
    expect(resolveAffiliations(['yumeAG', 'cocoAG', 'cocoConst', 'cocoAG', 'cocoAG', 'cocoAG'])).toBe(['ゆめてつ', 'ここすも']);
  });
});

