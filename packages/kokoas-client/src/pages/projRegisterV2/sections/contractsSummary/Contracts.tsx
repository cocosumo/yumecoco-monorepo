import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { ContractRecipients } from 'kokoas-client/src/components';
import { StaticContentInfos } from 'kokoas-client/src/components/ui/information/StaticContentInfos';
import { IContracts, TEnvelopeStatus } from 'types';
import { ContractTabLabel } from './ContractTableLabel';

export const Contracts = ({
  data,
  selectedContractId = '',
  handleChange,
}: {
  data: IContracts[],
  selectedContractId?: string,
  handleChange: (_: unknown, newValue: string) => void,
}) => {
  //const [value, setValue] = useState(data[0]?.uuid.value);




  return (
    <TabContext value={selectedContractId}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {data.map(({ 
            uuid,
            envelopeStatus, 
          }, index) => (
            <Tab 
              key={uuid.value} 
              label={(
                <ContractTabLabel 
                  envelopeStatus={envelopeStatus.value as TEnvelopeStatus}
                  textLabel={`契約${index + 1}`}
                />
                )} 
              value={uuid.value}
            />
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
          envelopeStatus,
          envRecipients,
        } = contract;

        const parsedData = [
          { label: '署名経路', value: <ContractRecipients hasContract={!!envelopeStatus.value} rawRecipients={envRecipients}  /> },
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
  );
};