import { Grid, Stack } from '@mui/material';
import { ComponentProps } from 'react';
import { LabeledInfo } from '../../../../components/ui/typographies';

export const Column2 = (
  {
    adminInfo: {
      storeName,
      custGroupId,
      customerIds,
      agents,
    },
  }: {
    adminInfo: {
      storeName: string,
      custGroupId: string,
      customerIds: string,
      agents: Array<ComponentProps<typeof LabeledInfo> & { key: string }>
    }
  },
) => {
  return (
    <Grid item xs={12} sm={6}>
      <Stack spacing={2}>

        <LabeledInfo label={'店舗名'} info={storeName} />
        {agents
          .map(({ key, label, info }) => {
            return <LabeledInfo key={key} {...{ label, info }} />;
          })}

        <LabeledInfo label={'グループ番号'} info={custGroupId} />
        <LabeledInfo label={'顧客番号'} info={customerIds} />
      </Stack>

    </Grid>
  );
};