
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useProjsByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { ICustgroups } from 'types';
import { ProjectsToolTipContent } from './projectsToolTipContent/ProjectsToolTipContent';
import { CustomWidthTooltip } from './projectsToolTipContent/CustomTooltip';
import { grey } from '@mui/material/colors';



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
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: 360,
             
              }}
            >
              {projRecs[0].projName.value}
            </Typography>
            {projRecs.length > 1 && (
            <Typography 
              color={'text.secondary'}
              fontSize={'0.6rem'}
              bgcolor={grey[50]}
              padding={0.5}
              whiteSpace={'nowrap'}
            >
              {`+${projRecs.length}案件`}
            </Typography>
            )}

          </Stack>
        </CustomWidthTooltip>
 
      )}

    </Stack>
  );
};