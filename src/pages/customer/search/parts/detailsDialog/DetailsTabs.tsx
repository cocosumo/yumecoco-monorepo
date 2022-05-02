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
import { ButtonEdit } from './ButtonEdit';
import { getConstRecordByIds } from '../../../../../api/kintone/construction';

export function DetailsTabs(props : {
  custGroupId?: string,
}) {
  const { custGroupId } = props;
  const [tabValue, setTabValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const [record, setRecord] = useState<CustomerGroupTypes.SavedData>();
  const [fetchedProjects, setFetchedProjects] = useState<ConstructionDetails.SavedData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const projectIds =  record?.projects?.value
    .map(item => item.value.constructionId.value)
    .filter(Boolean) ?? [];

  useEffect(()=>{
    if (projectIds.length && !fetchedProjects && tabValue === '2'){
      getConstRecordByIds(
        projectIds,
      ).then(result => {
        console.log('triggered');
        setFetchedProjects(result.records as unknown as ConstructionDetails.SavedData[]);
      });
    }
  }, [JSON.stringify(projectIds), fetchedProjects, tabValue]);

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

  const isWithProject = Boolean(record?.projects.value
    .filter(item=>item.value.constructionId.value)
    .length);

  console.log(isWithProject, record?.projects.value);
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext  value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList variant='fullWidth' onChange={handleChange} >
            <Tab label="顧客情報" value="1" />
            <Tab label="工事情報" value="2" disabled={!isWithProject} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DTCustomer {...{ record, loading }} />
          <ButtonEdit link={`/custgroup/edit/${custGroupId}`}/>
        </TabPanel>
        <TabPanel value="2">
          {
            fetchedProjects &&
            <DTProject loading={loading} fetchedProjects={fetchedProjects} />
          }
        </TabPanel>
      </TabContext>
    </Box>
  );
}
