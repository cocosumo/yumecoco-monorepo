
import { Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { useProjsByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { ICustgroups } from 'types';
import { ProjectsToolTipContent } from './projectsToolTipContent/ProjectsToolTipContent';
import { CustomWidthTooltip } from './projectsToolTipContent/CustomTooltip';



export const ResultItemRelatedProj = ({
  item,
}:{
  item: ICustgroups,
}) => {

  const { 
    data: projRecs = [], 
    isLoading: isProjRecsLoading,
  } = useProjsByCustGroupId(item.uuid.value); 


  return (
    <Stack
      direction={'row'}
    >
      {isProjRecsLoading && (<CircularProgress size={20} />)}
      {!!projRecs.length && (
        <CustomWidthTooltip 
          title={<ProjectsToolTipContent projects={projRecs} />}
          sx={{
            '& .MuiTooltip-tooltip': {
              maxWidth: 1000,
            },
          }}
        >
          <Stack 
            direction={'row'}
            alignItems={'center'}
          >
            <Typography 
              color={'text.secondary'}
              fontSize={'0.75rem'}
              sx={{
                mr: 1,
              }}
            >
              {projRecs[0].projName.value}
            </Typography>
            {projRecs.length > 1 && (
            <Chip 
              label={`+ ${projRecs.length}件`}
              size='small'
            />
            )}
          </Stack>
        </CustomWidthTooltip>
 
      )}

    </Stack>
  );
};