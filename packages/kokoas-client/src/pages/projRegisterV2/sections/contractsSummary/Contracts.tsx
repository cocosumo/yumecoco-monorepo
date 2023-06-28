import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { StaticContentInfos } from 'kokoas-client/src/components/ui/information/StaticContentInfos';
import { useState } from 'react';
import { IContracts } from 'types';

export const Contracts = ({
  data,
}: {
  data: IContracts[]
}) => {
  const [value, setValue] = useState('1');
  const handleChange = (_: unknown, newValue: string) => {
    setValue(String(newValue));
  };



  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {data.map((_, index) => (
            <Tab key={`契約${index + 1}`} label={`契約${index + 1}`} value={String(index + 1)} />
          ))}
        </TabList>
      </Box>
      {data.map((
        contract, 
        index,
      ) => {
        const {
          uuid,
          totalContractAmt,
          contractDate,
        } = contract;

        const parsedData = [
          { label: '契約金額', value: `${(+totalContractAmt.value).toLocaleString()} 円` },
          { label: '契約日', value: contractDate.value },
        ];

        return (
          <TabPanel 
            key={uuid.value} 
            value={String(index + 1)}
            sx={{
              px: 0,
            }}
          >
            <StaticContentInfos data={parsedData} />
          </TabPanel>
        );
      })}
    </TabContext>
  );
};