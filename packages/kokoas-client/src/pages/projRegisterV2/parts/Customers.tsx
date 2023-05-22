import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { Info } from 'kokoas-client/src/components';
import { useCustomersByCustGroupId } from 'kokoas-client/src/hooksQuery';
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
    }) => {
      const tels = resolveContact(contacts, 'tel');
      
      const email = resolveContact(contacts, 'email');

      const custInfo = [
        { label: '氏名', value: fullName.value },
        { label: '電話番号', value: tels.join(', ') },
        { label: 'メールアドレス', value: email.join(', ') },
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
        <TabPanel key={`顧客${index + 1}`} value={String(index + 1)}>
          {cust.map(({ label, value: _value }) => (
            <Info key={label} label={label} value={_value || '-'} />
          ))}
        </TabPanel>
      ))}
    </TabContext>
  );

};