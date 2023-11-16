import { Chip, Stack, Zoom, styled } from '@mui/material';
import { useContractsByCustGroupIdV2 } from 'kokoas-client/src/hooksQuery';
import { ICustgroups } from 'types';

const StatusChip = styled(Chip)(() => ({
  fontSize: '0.6rem',
  height: 16,
  borderRadius: 4,
  padding: '0 2px',
  width: 'fit-content',
}));


export const ResultItemStatuses = ({
  item,
}:{
  item: ICustgroups,
}) => {

  const isDeleted  = Boolean(+item.isDeleted.value);
  const { data: completedContracts } = useContractsByCustGroupIdV2({
    custGroupId: item.uuid.value,
    envStatus: 'completed',
  });
  
  const hasCompletedContracts = Boolean(completedContracts?.length);

  return (
    <Stack
      direction={'row'}
      spacing={0.5}
      py={0.5}
    >

      <StatusChip
        label={item.storeName.value}
      />
      <Zoom in={isDeleted} unmountOnExit >
        <StatusChip
          label={'無効'}
          color='error'
        />
      </Zoom>
      <Zoom in={hasCompletedContracts} unmountOnExit >
        <StatusChip
          label={'契約有'}
          color='success'
        />
      </Zoom>



    </Stack>
  );
};