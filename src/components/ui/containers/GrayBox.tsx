import { Box, Stack, Typography } from '@mui/material';

interface GrayBoxProps {
  label?: string,
  children: React.ReactNode
}

const GrayBox = (props: GrayBoxProps) => {
  const {
    children,
    label = '【参照結果】',
  } = props;
  return (
    <Box
      borderRadius={2}
      bgcolor={'#EFEFEF'}
      py={3} px={3}
    >
      <Stack spacing={1}>
        <Typography color={'rgba(0, 0, 0, 0.6)'} variant={'subtitle2'}>{label}</Typography>
        {children}
      </Stack>

    </Box>
  );
};

export default GrayBox;