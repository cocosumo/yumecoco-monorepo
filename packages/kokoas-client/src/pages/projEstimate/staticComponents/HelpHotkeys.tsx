import { Grid } from '@mui/material';
import { Fragment } from 'react';

const hotkeysHelp = [
  ['enter', '編集（セル移動）'],
  ['tab', 'セル移動'],
  ['矢印', 'セル移動'],
  ['insert', '行追加'],
  ['shift + insert', '下にコピー'],
  ['delete', '削除'],
  ['shift + delete', '行削除'],
];

export const HelpHotKeys = () => {

  return (
    <Grid container width={150}>
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