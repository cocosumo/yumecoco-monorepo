
const form = {
  a : { valueError: true, nextClick: true, page: 1 },
  b : { valueError: false, nextClick: true, page: 1 },
  c : { valueError: false, nextClick: true, page: 1 },
  d : { valueError: true, nextClick: true, page: 1 },
  e : { valueError: true, nextClick: true, page: 2 },
  f : { valueError: true, nextClick: true, page: 2 },
};

test('testlang',
  () => {

    const fieldNamesWithError = Object
      .entries(form)
      .reduce((accu, [key, { valueError, nextClick, page }]) => {
        if (valueError &&  nextClick && page === 1){
          return accu.concat(key);
        }
        return accu;
      }, [] as string[]);



    expect(fieldNamesWithError).toMatchSnapshot();
  },
);