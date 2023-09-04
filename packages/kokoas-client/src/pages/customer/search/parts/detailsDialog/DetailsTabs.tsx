
import { Box, Tab,  Skeleton  } from '@mui/material';
import {  TabList, TabPanel } from '@mui/lab';
import { DTCustomer } from './customers/DTCustomer';
import { ProjectDetailsContainer } from './projects/ProjectDetailsContainer';
import { useState, SyntheticEvent } from 'react';
import { ButtonEdit } from './ButtonEdit';
import { pages } from '../../../../Router';
import { generateParams } from '../../../../../helpers/url';
import { TabContextContainer } from './TabContextContainer';
import { useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useProjsByCustGroupId } from 'kokoas-client/src/hooksQuery/useProjsByCustGroupId';
import { useIsFetching } from '@tanstack/react-query';


export function DetailsTabs(props : {
  custGroupId?: string,
}) {
  const { custGroupId } = props;
  const [tabValue, setTabValue] = useState('1');
  const isFetching = useIsFetching();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const { data: custGroupRec } = useCustGroupById(custGroupId || '');
  const { data: projRecs } = useProjsByCustGroupId(custGroupId || '');


  const isWithProject = Boolean(projRecs?.length);

  return (
    <TabContextContainer tabValue={tabValue}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList variant='fullWidth' onChange={handleChange} >
          <Tab label="顧客情報" value="1" />
          <Tab label="工事情報" value="2" disabled={!isWithProject} />
        </TabList>
      </Box>
      <TabPanel value="1">
        <DTCustomer loading={!!isFetching} record={custGroupRec} />
        <ButtonEdit link={`${pages.custGroupEditV2}?${generateParams({
          custGroupId,
        })}`}
        />
      </TabPanel>
      <TabPanel value="2">
        {
            projRecs &&
            <ProjectDetailsContainer fetchedProjects={projRecs} />
          }

        {
            !projRecs &&
            <Skeleton variant="rectangular" width={210} height={118} />
          }
      </TabPanel>
    </TabContextContainer>

  );
}
