import { Grid, Stack } from '@mui/material';
import { LabeledInfo, LabeledInfoProps } from '../../../../components/ui/typographies';

export const Column2 = (
  {
    adminInfo: {
      storeName,
      custGroupId,
      customerId,
      agents,
    },
  }: {
    adminInfo: {
      storeName: string,
      custGroupId: string,
      customerId: string,
      agents: Array<LabeledInfoProps & { key: string }>
    }
  },
) => {
  return (
    <Grid item xs={12} sm={6}>
      <Stack spacing={2}>

        <LabeledInfo label={'店舗名'} data={storeName} />
        {agents
          .map(({ key, label, data }) => {
            return <LabeledInfo key={key} {...{ label, data }} />;
          })}

        <LabeledInfo label={'グループ番号'} data={custGroupId} />
        <LabeledInfo label={'顧客番号'} data={customerId} />
      </Stack>

    </Grid>
  );
};

/*        {custGroupRecord?.agents
          .value
          .reduce((accu, { id, value: { agentType, employeeName } })=>{
            const rawLabel = AGLabels[agentType.value as keyof typeof AGLabels];
            const numberedLabel = `${rawLabel ?? '担当者'}1`;
            const isExist = accu.some(item => item.label === numberedLabel);
            const resolvedLabel = isExist ?  `${rawLabel}2` : numberedLabel;

            return [...accu, { key: id, label: resolvedLabel, data: employeeName.value }];
          }, [] as Array<LabeledInfoProps & { key: string }>) */