import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab } from '@mui/material';
import { StaticContentActions } from 'kokoas-client/src/components/ui/information/StaticContentActions';
import { StaticContentInfos } from 'kokoas-client/src/components/ui/information/StaticContentInfos';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';
import { useState } from 'react';
import { IContracts } from 'types';

export const Contracts = ({
  data,
}: {
  data: IContracts[]
}) => {
  const [value, setValue] = useState(data[0].uuid.value);
  const navigate = useNavigateWithQuery();

  const handleChange = (_: unknown, newValue: string) => {
    setValue(newValue);
  };



  return (
    <>
  
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {data.map(({ uuid }, index) => (
              <Tab key={`契約${index + 1}`} label={`契約${index + 1}`} value={uuid.value} />
            ))}
          </TabList>
        </Box>
        {data.map((
          contract, 
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
              value={uuid.value}
              sx={{
                px: 0,
              }}
            >
              <StaticContentInfos data={parsedData} />
            </TabPanel>
          );
        })}
      </TabContext>
      <StaticContentActions>
        <Button
          onClick={() => navigate('projContractPreviewV2', {
            contractId: value,
          })}
          variant='outlined'
        >
          編集
        </Button>
      </StaticContentActions>
    </>
  );
};