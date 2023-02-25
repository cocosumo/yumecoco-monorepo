import { resolveAffiliations } from '.';

describe('resolveAffiliations', () => {
  it('should resolve affiliation of a single agent', () => {
    expect(resolveAffiliations('cocoConst')).toMatchObject(['ここすも']);
  });

  it('should resolve affiliations of an array of agents', () => {
    expect(resolveAffiliations(['yumeAG', 'cocoAG', 'cocoConst'])).toMatchObject(['ゆめてつ', 'ここすも']);
  });

  it('should resolve unique affiliations of an array of agents with duplicates', () => {
    expect(resolveAffiliations(['yumeAG', 'cocoAG', 'cocoConst', 'cocoAG', 'cocoAG', 'cocoAG'])).toMatchObject(['ゆめてつ', 'ここすも']);
  });
});

