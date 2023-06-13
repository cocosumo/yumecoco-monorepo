import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { PageTitleText } from './PageTitleText';
import { useEffect } from 'react';

/**
 * Gridではなく、Boxを利用した見出しです。
 * 
 */
export const PageTitle3 = (props: {
  color?: string;
  backgroundColor?: string;
  label: string;
  secondaryLabel?: string;
}) => {
  const {
    backgroundColor = '#9CDAF9',
    color = grey[700],
    secondaryLabel,
    label,
  } = props;

  useEffect(() => {
    document.title = [label, secondaryLabel].filter(Boolean).join(' - ');
  }, [label, secondaryLabel]);

  return (
    <Box
      style={{
        backgroundColor: backgroundColor,
      }}
      p={2}
    >
      <PageTitleText color={color} >
        {label}
      </PageTitleText>
    </Box>
  );
};