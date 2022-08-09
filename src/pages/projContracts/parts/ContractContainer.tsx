import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import { DetailsInput } from './TabInput/DetailsInput';

import { Preview } from './TabPreview/Preview';

export const ContractContainer = () => {
  const [currTab, setCurrTab ] = useState('1');


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrTab(newValue);
  };

  return (
    <TabContext value={currTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="契約内容" value="1" />
          <Tab label="プレビュー" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <DetailsInput />
      </TabPanel>
      <TabPanel value="2">
        <Preview />
      </TabPanel>

    </TabContext>
  );
};