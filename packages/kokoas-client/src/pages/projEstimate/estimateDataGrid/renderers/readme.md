## FAQ

1. どうして、renderer に 以下のコードを使っているのですか？
  ```
  useEffect(
      () => {
        if (ref.current) {
          setTimeout(() => ref.current?.select(), 0); 
        }
      }, 
      [ref],
    );
  ```

  当時、フォーカスがなくなるとという不具合が発生しました。そのため、フォーカスがなくなると、再度フォーカスを当てるようにしています。
  次いでに、select() で、テキストを選択するようにしています。
  setTimeout は、フォーカスがなくなると、再度フォーカスを当てるようにするために使っています。

  よりいい方法があるとかもしれませんが、時間がなかったため、思いついた方法を使っています。- ras 2024.03.16

2. 通常の `textEditor` はありますが、どうして利用していないのですか？
  
  より高度な機能を提供するために、カスタムのコンポーネントを使っています。

  参考：https://github.com/adazzle/react-data-grid/blob/main/website/demos/CommonFeatures.tsx
