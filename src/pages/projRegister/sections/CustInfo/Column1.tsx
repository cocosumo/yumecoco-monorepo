import { Grid, Stack } from '@mui/material';
import { LabeledInfo } from '../../../../components/ui/typographies';

export const Column1 = ({
  custDetail: {
    customerName,
    custNameReading,
    email, emailRel,
    phone1, phone1Rel,
    phone2, phone2Rel,
    address,
    otherCustName,
  }, 
}: {
  custDetail: {
    customerName: string,
    custNameReading: string,
    email: string,
    emailRel: string,
    address: string,
    phone1: string,
    phone1Rel: string,
    phone2: string,
    phone2Rel: string,
    otherCustName: string[]
  }
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Stack spacing={2}>
        
        <LabeledInfo label="氏名" data={customerName} />
        <LabeledInfo label="氏名フリガナ" data={custNameReading} />
        <LabeledInfo
          label="現住所"
          data={address}
        />
        <LabeledInfo label="メアド" data={email ? [email, emailRel].join(',') : ''} />
        <LabeledInfo label="電話番号１" data={phone1 ? [phone1, phone1Rel].join(',') : ''} />
        <LabeledInfo label="電話番号２" data={phone2 ? [phone2, phone2Rel].join(',') : ''} />
        {otherCustName
          .map((custName, index) => (
            <LabeledInfo key={custName} label={`契約者${index + 1}`} data={custName} />
          ) )}
      </Stack>
    </Grid>
  );
};