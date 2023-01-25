import { Grid } from '@mui/material';
import { Fragment } from 'react';

const hotkeysHelp = [
  ['ctrl + s', '一時保存'],
  ['insert', '行追加'],
  ['ctrl + delete', '行削除'],
  ['ctrl + enter', '次の行に移動'],
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