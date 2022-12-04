import { roundTo } from './roundTo';

it('roundTo', () => {

  expect(roundTo(0.001, 2)).toEqual(0);
  expect(roundTo(0.01, 2)).toEqual(0.01);
  expect(roundTo(0.555, 2)).toEqual(0.56);
  expect(roundTo(0.99999999999, 2)).toEqual(1);
  expect(roundTo(0.129, 2)).toEqual(0.13);
  expect(roundTo(0.129, 1)).toEqual(0.1);

  expect(roundTo(1.005, 2)).toEqual(1.01);
  expect(roundTo(1.005, 0)).toEqual(1);
  expect(roundTo(1.005)).toEqual(1);

  expect(roundTo(50.99999999999, 2)).toEqual(51);

  expect(roundTo(22.1212, 2)).toEqual(22.12);
  expect(roundTo(22.555, 2)).toEqual(22.56);

});