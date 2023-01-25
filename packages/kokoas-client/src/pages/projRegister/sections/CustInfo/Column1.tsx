import { Grid, Stack } from '@mui/material';
import { translations } from 'kokoas-client/src/helpers/translations';
import { LabeledInfo } from '../../../../components/ui/typographies';

export const Column1 = ({
  custDetail: {
    custNames,
    custNamesReading,
    contactTuples,
    address,
  },
}: {
  custDetail: {
    custNames: string,
    custNamesReading: string,

    /** 一つ目の顧客情報 */
    contactTuples: string[][]
    address: string,

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

        {
          contactTuples.map(([contactType, value]) => {
            return  (
              <LabeledInfo
                key={contactType + value}
                label={translations[contactType]} info={value}
              />);
          })
        }

      </Stack>
    </Grid>
  );
};