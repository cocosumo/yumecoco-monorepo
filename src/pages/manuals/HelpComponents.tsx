import { CssBaseline, Divider, styled } from '@mui/material';
import ManualMenus from './ManualMenus';
import ManualRouter from './ManualRouter';
import { Box } from '@mui/system';

export const manualMenusWidth = '240';

const ExplanationMain = styled('div')`
  color: red;
  padding: 10px 50px;
  display: flex;
  alignItems: start;
  justifyContent: center;
`;

export default function HelpComponents() {
  return (
    <Box 
    sx={{
      display: 'flex',
      height: '100vh',
    }}>
      <CssBaseline />
      <ManualMenus />
      <Divider orientation="vertical" flexItem />
      <ExplanationMain>
        <ManualRouter />
      </ExplanationMain>
    </Box>
  );
}