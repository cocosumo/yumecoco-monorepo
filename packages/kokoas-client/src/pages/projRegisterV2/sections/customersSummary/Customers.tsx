import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { StaticContentInfos } from 'kokoas-client/src/components/ui/information/StaticContentInfos';
import { useCustomersByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { addressBuilder } from 'libs';
import { useMemo, useState } from 'react';
import { ICustomers, TContact } from 'types';


const resolveContact = (
  contacts: ICustomers['contacts'], 
  type: TContact,
) => {

  return contacts
    .value
    .filter(({ value: { contactType, contactValue } }) => !!contactValue.value && contactType.value === type)
    .map(({ value: { contactValue, relation } }) => `${contactValue.value}(${relation.value})`);
}; 

export const Customers = ({
  custGroupId,
}: {
  custGroupId: string;
}) => {
  const [value, setValue] = useState('1');

  const handleChange = (_: unknown, newValue: string) => {
    setValue(String(newValue));
  };


  const { data: custData } = useCustomersByCustGroupId(custGroupId as string);
  const customers = useMemo(() => {
    if (!custData) return [];
    const contactDatails = custData?.map(({
      fullName,
      contacts,
      postalCode,
      address1,
      address2,
    }) => {
      const tels = resolveContact(contacts, 'tel');
      
      const email = resolveContact(contacts, 'email');

      const address = addressBuilder({
        postal: postalCode.value,
        address1: address1.value,
        address2: address2.value,
      });

      const custInfo = [
        { label: '氏名', value: fullName.value },
        { label: '住所', value: address || '-' },
        { label: '電話番号', value: tels.join(', ') || '-' },
        { label: 'メールアドレス', value: email.join(', ') || '-' },
      ];
      

      return custInfo;
    });
    return contactDatails;
  }, [custData]);

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {customers.map((_, index) => (
            <Tab key={`顧客${index + 1}`} label={`顧客${index + 1}`} value={String(index + 1)} />
          ))}
        </TabList>
      </Box>
      {customers.map((cust, index) => (
        <TabPanel 
          key={`顧客${index + 1}`} 
          value={String(index + 1)}
          sx={{
            px: 0,
          }}
        >
          <StaticContentInfos data={cust} />
        </TabPanel>
      ))}
    </TabContext>
  );

};