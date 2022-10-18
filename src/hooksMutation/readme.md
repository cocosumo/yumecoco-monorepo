# Mutation

Mutationに関わる独自フックはここに入ります。

## useMatationについて

- [英語](https://tanstack.com/query/v4/docs/guides/mutations)
- [日本語](https://qiita.com/suzuki0430/items/1812e600797bba661cef)

## Caveats

- Kintone doesn't allow direct connections to external API's.
Kintone require use of [kintone.proxy](https://developer.cybozu.io/hc/ja/articles/202166320-%E5%A4%96%E9%83%A8API%E3%81%AE%E5%AE%9F%E8%A1%8C)

## Testing

- Name test files as [filename].test.ts
- Make sure the API is unit testable by putting the callback into a separate function.
- Use axios during testing in place of kintone.proxy when accesing API aside from Kintone.
