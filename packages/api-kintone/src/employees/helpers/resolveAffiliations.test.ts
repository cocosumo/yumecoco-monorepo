import { resolveAffiliations } from '.';

test('resolve', () => {
  expect(resolveAffiliations('cocoConst').length).toBeTruthy();
  expect(resolveAffiliations(['yumeAG', 'cocoAG', 'cocoConst']).length).toBeTruthy();
});