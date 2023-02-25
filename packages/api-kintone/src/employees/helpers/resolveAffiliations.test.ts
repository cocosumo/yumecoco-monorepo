import { resolveAffiliations } from '.';

test('resolve', () => {
  expect(resolveAffiliations('cocoConst').length).toBeTruthy();
  const affiliations = resolveAffiliations(['yumeAG', 'cocoAG', 'cocoConst']);
  expect(affiliations).toBeTruthy();
});