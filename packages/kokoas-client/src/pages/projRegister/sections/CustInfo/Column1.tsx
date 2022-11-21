import { Grid, Stack } from '@mui/material';
import { LabeledInfo } from '../../../../components/ui/typographies';

export const Column1 = ({
  custDetail: {
    custNames,
    custNamesReading,
    email, emailRel,
    phone1, phone1Rel,
    phone2, phone2Rel,
    address,
  },
}: {
  custDetail: {
    custNames: string,
    custNamesReading: string,
    email: string,
    emailRel: string,
    address: string,
    phone1: string,
    phone1Rel: string,
    phone2: string,
    phone2Rel: string,
  }
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Stack spacing={2}>

        <LabeledInfo label="氏名" info={custNames} />
        <LabeledInfo label="氏名フリガナ" info={custNamesReading} />
        <LabeledInfo
          label="現住所"
          info={address}
        />
        <LabeledInfo label="メアド" info={email ? [email, emailRel].join(',') : ''} />
        <LabeledInfo label="電話番号１" info={phone1 ? [phone1, phone1Rel].join(',') : ''} />
        <LabeledInfo label="電話番号２" info={phone2 ? [phone2, phone2Rel].join(',') : ''} />
      </Stack>
    </Grid>
  );
};