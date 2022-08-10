import {  Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';


export const EmptyProject = (props: {
  handleSearchTTOpen: ()=>void,
  handleSearchTTClose: ()=>void,
}) => {
  const { handleSearchTTOpen, handleSearchTTClose } = props;
  const theme = useTheme();
  const secondaryColor = theme.palette.secondary.main;
  return (

    <Box
      onMouseEnter={handleSearchTTOpen}
      onMouseLeave={handleSearchTTClose}
      sx={{
        width: '100%',
        border: `2px dashed ${theme.palette.grey[300]}`,
        borderRadius: '10px',
        padding: '8px',
      }}
    >
      <Stack spacing={2} direction={'column'} alignItems="center">
        <Typography variant="h6" color={ secondaryColor }>工事名で検索してください</Typography>
      </Stack>
    </Box>
  );
};