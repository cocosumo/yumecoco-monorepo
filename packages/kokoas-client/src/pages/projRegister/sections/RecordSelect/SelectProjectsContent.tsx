import { DialogContent, List, ListItemButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { format,  parseISO } from 'date-fns';
import { ContentWarning } from 'kokoas-client/src/components/ui/dialogs/ContentWarning';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { useProjsByCustGroupId } from 'kokoas-client/src/hooksQuery/useProjsByCustGroupId';
import { pages } from 'kokoas-client/src/pages/Router';
import { useMemo } from 'react';

export const SelectProjectsContent = ({
  custGroupId,
  handleClose,
}: {
  custGroupId?: string
  handleClose: () => void
}) => {
  const navigate = useStableNavigate();
  const { data: projRecs } = useProjsByCustGroupId(custGroupId || '');

  const options = useMemo(() => {

    if (!projRecs?.length) {
      return (
        <ContentWarning content={'見積もりはまだ作成されていません'} direction="row" />
      );
    }

    return projRecs?.map(({
      $id: projId,
      projName,
      作成日時: createTime,
      cocoAGNames,
      yumeAGNames,
      cocoConstNames,
    }) => {
      return (
        <ListItemButton
          key={projId.value}
          divider
          onClick={()=>{
            navigate(`${pages.projEdit}?${generateParams({
              projId: projId.value,
            })}`);
            handleClose();
          }}
        >
          <Stack direction="row" width={'100%'}>
            <Stack width={'50%'}>
              <Typography variant="caption">
                {`工事番号：${projId.value} `}
              </Typography>
              <Typography
                fontSize={16}
                color={grey[800]}
                fontWeight={'bold'}
                component="span"
              >
                {projName.value}
              </Typography>
              <Typography variant="caption">
                {`${format(parseISO(createTime.value), 'yyyy/MM/dd')}`}
              </Typography>
            </Stack>

            <Stack width={'50%'}>
              <Typography variant="caption">
                {`ゆめてつAG：${yumeAGNames.value}`}
              </Typography>
              <Typography variant="caption">
                {`ここすも担当者：${cocoAGNames.value}`}
              </Typography>
              <Typography variant="caption">
                {`工事担当者：${cocoConstNames.value}`}
              </Typography>
            </Stack>
          </Stack>
        </ListItemButton>
      );
    });

  },
  [
    projRecs,
    handleClose,
    navigate,
  ]);

  return (
    <DialogContent dividers>
      <List >
        {options}
      </List>
    </DialogContent>
  );
};