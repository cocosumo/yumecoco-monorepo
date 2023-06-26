import { addressBuilder } from './addressBuilder';
import { expect, it } from '@jest/globals';

it('should build address in correct format', () => {

  /* 〒←マークは番号の前に。ハイフンも入れる。 */
  expect(addressBuilder({
    postal: '4418124',
    address1: '愛知県豊橋市野依町字山中１０－１０',
    address2: 'ABC',
  }))
    .toEqual('〒441-8124 愛知県豊橋市野依町字山中１０－１０ABC');


  /* 郵便番号が入っていない場合は、マークを外す */
  expect(addressBuilder({
    address1: '愛知県豊橋市野依町字山中１０－１０',
    address2: 'ABC',
  }))
    .toEqual('愛知県豊橋市野依町字山中１０－１０ABC');

  /* address1だけ */
  expect(addressBuilder({
    address1: '愛知県豊橋市野依町字山中１０－１０',
  }))
    .toEqual('愛知県豊橋市野依町字山中１０－１０');
});