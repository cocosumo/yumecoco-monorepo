import { Avatar, Chip, ChipProps, Grid, Stack, Tooltip } from '@mui/material';
import { useFormikContext } from 'formik';
import { AndpadLogo } from 'kokoas-client/src/components/ui/icons';
import { TypeOfForm } from '../form';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';

const AndpadChip = ({
  systemId,
  tooltipTitle,
  color,
  onDelete,
}:{
  systemId: string | number,
  tooltipTitle?: string,
  color?: ChipProps['color'],
  onDelete?: () => void,
}) => (
  <Tooltip title={tooltipTitle}>
    <Chip
      color={color}
      avatar={(
        <Avatar
          sx={{
            bgcolor: 'red',
          }}
        >
          <AndpadLogo />
        </Avatar>)}
      label={systemId}
      onClick={() => {
        window.open(`https://andpad.jp/my/orders/${systemId}`, '_blank');
      }}
      onDelete={onDelete}
    />
  </Tooltip>
);

export const ExternalLinks = () => {
  const { values: {
    forceLinkedAndpadSystemId,
    andpadDetails,
    projId,
  } } = useFormikContext<TypeOfForm>();

  const {
    システムID: systemId,
  } = andpadDetails || {};

  const { mutate: saveProject } = useSaveProject();

  const handleRemoveForceLinkedAndpadSystemId = () => {
    saveProject({
      projId,
      record: {
        forceLinkedAndpadSystemId: { value: '' },
      },
    });
  };

  return (
    <Grid item xs={12}>
      <Stack direction={'row'} spacing={2}>
        {systemId && (
        <AndpadChip 
          systemId={systemId}
          tooltipTitle='ここあすからANDPADへの情報更新が出来ます'
        />)}
        {forceLinkedAndpadSystemId && (
          <AndpadChip 
            tooltipTitle='強制接続のため、ここあすからANDPADへの情報更新が出来ません'
            systemId={forceLinkedAndpadSystemId}
            onDelete={handleRemoveForceLinkedAndpadSystemId}
            color='warning'
          />
      
        )}
        
      </Stack>

    </Grid>
  );
};