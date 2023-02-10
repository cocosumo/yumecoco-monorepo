
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import { PageTitleText } from './PageTitleText';


/**
 * 新Gridを利用した見出しです。
 *
 * まだ不安定バージョンのようで、現のPageTitleはまだ廃棄しません
 * @see https://mui.com/material-ui/react-grid2/
 */
export const PageTitle2 = (props: {
  color?: string,
  backgroundColor?: string,
  label: string
  secondaryLabel?: string,
}) => {
  const {
    backgroundColor = '#9CDAF9',
    color = grey[700],
    secondaryLabel,
    label,
  } =  props;

  useEffect(() => {
    document.title = [label, secondaryLabel].filter(Boolean).join(' - ');
  }, [label, secondaryLabel]);

  return (
    <Grid xs={12} p={2}
      sx={{ backgroundColor }}
    >
      <PageTitleText color={color}>
        {label}
      </PageTitleText>
    </Grid>
  );
};