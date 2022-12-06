import { addressBuilder } from './addressBuilder';

it('should build address in correct format', () => {
  expect(addressBuilder({
    postal: '4418124',
    address1: '愛知県豊橋市野依町字山中１０－１０',
    address2: 'ABC',
  })).toEqual('〒441-8124 愛知県豊橋市野依町字山中１０－１０ABC');

  expect(addressBuilder({
    address1: '愛知県豊橋市野依町字山中１０－１０',
    address2: 'ABC',
  })).toEqual('愛知県豊橋市野依町字山中１０－１０ABC');

  expect(addressBuilder({
    address1: '愛知県豊橋市野依町字山中１０－１０',
  })).toEqual('愛知県豊橋市野依町字山中１０－１０');
});