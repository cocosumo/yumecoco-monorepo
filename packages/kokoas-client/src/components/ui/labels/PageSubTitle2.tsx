import { Divider, Typography } from '@mui/material';
import { ReactNode } from 'react';
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';

/**
 * 新Gridを利用した見出しです。
 *
 * まだ不安定バージョンのようで、現のPageTitleはまだ廃棄しません
 * @see https://mui.com/material-ui/react-grid2/
 */
export const PageSubTitle = (props: Grid2Props & {
  label: ReactNode
}) => {
  const {
    label,
    ...others
  } = props;

  return (
    <Grid xs={12} {...others}>
      <Divider textAlign="left">
        <Typography variant="h6">
          {label}
        </Typography>
      </Divider>
    </Grid>
  );
};