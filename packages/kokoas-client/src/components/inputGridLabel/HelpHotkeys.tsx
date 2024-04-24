import { Grid } from '@mui/material';
import { Fragment } from 'react';

const hotkeysHelp = [
  ['編集', 'enter'],
  ['次のセル', 'tab'],
  ['前のセル', 'shift + tab'],
  ['セル移動', '↑ ↓ ← →'],
  ['行追加', 'ctrl + +'],
  ['下に行コピー', 'alt + e'],
  ['セル内容削除', 'delete'],
  ['行削除', 'ctrl + -'],
  ['保存', 'ctrl + s'],
  ['行の最初セル', 'home'],
  ['行の最後セル', 'end'],
];

export const HelpHotKeys = () => {

  return (
    <Grid container width={200}>
      {
        hotkeysHelp.map(([key, info]) => (
          <Fragment key={key}>
            <Grid item xs={6}>
              {key}
            </Grid>
            <Grid item xs={6}>
              {info}
            </Grid>
          </Fragment>
        ))
      }
    </Grid>
  );
};