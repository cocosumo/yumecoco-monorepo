import { resolveAffiliations } from '.';

test('resolve', () => {
  expect(resolveAffiliations('cocoConst')).toMatchSnapshot();
  expect(resolveAffiliations(['yumeAG', 'cocoAG', 'cocoConst'])).toMatchSnapshot();
});