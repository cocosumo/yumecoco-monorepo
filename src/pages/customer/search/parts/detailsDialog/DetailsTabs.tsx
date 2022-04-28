import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DTCustomer } from './DTCustomer';
import { DTProject } from './DTProject';
import { useState, useEffect } from 'react';
import { getCustGroup } from '../../../../../api/kintone/custgroups/GET';

export function DetailsTabs(props : {
  custGroupId?: string,
}) {
  const { custGroupId } = props;
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [record, setRecord] = useState<CustomerGroupTypes.SavedData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=>{
    if (custGroupId){
      setLoading(true);
      getCustGroup(custGroupId)
        .then(resp => {
          console.log('triggered!');
          setLoading(false);
          setRecord(resp.record as unknown as CustomerGroupTypes.SavedData);
        });
    }
  }, [custGroupId]);

  const isWithProject = Boolean(record?.projects.value.filter(item=>item.id));

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="顧客情報" value="1" />
            <Tab label="工事情報" value="2" disabled={!isWithProject} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DTCustomer {...{ record, loading }} />
        </TabPanel>
        <TabPanel value="2">
          <DTProject projects={record?.projects} loading={loading} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
