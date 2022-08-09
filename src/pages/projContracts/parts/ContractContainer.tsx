import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { FabSave } from '../../../components/ui/fabs/FabSave';
import { FabStartProcess } from './FabStartProcess';
import { DetailsInput } from './TabInput/DetailsInput';

import { Preview } from './TabPreview/Preview';

export type TContractTab = 'preview' | 'form';

const formTab : TContractTab =  'form';
const previewTab : TContractTab =  'preview';

export const ContractContainer = () => {
  const [currTab, setCurrTab ] = useState<TContractTab>('form');
  const { submitForm } = useFormikContext();
  const handleChange = (event: React.SyntheticEvent, newValue: TContractTab) => {
    setCurrTab(newValue);
  };



  return (
    <TabContext value={currTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="契約内容" value={formTab} />
          <Tab label="プレビュー" value={previewTab} />
        </TabList>
      </Box>
      <TabPanel value={formTab}>
        <DetailsInput />
      </TabPanel>
      <TabPanel value={previewTab}>
        <Preview />
      </TabPanel>
      <FabSave onClick={submitForm} appear={currTab === formTab}/>
      <FabStartProcess appear={currTab === formTab}/>
    </TabContext>
  );
};