import { DialogContent, List, ListItemButton, Typography, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { format,  parseISO } from 'date-fns';
import { ContentWarning } from 'kokoas-client/src/components/ui/dialogs/ContentWarning';
import { Caption } from 'kokoas-client/src/components/ui/typographies';
import { useProjsByCustGroupId } from 'kokoas-client/src/hooksQuery/useProjsByCustGroupId';
import { useMemo } from 'react';
import { IProjects } from 'types';

export const SelectProjInCustGroupContent = ({
  custGroupId,
  handleClose,
  onChange,
}: {
  custGroupId?: string
  handleClose: () => void
  onChange: (projRec: IProjects) => void
}) => {
  const { data: projRecs } = useProjsByCustGroupId(custGroupId || '');

  const options = useMemo(() => {

    if (!projRecs?.length) {
      return (
        <ContentWarning content={'工事情報はまだ作成されていません'} direction="row" />
      );
    }

    return projRecs?.map((projRec) => {

      const {
        $id: projId,
        projName,
        作成日時: createTime,
        cocoAGNames,
        yumeAGNames,
        cocoConstNames,
        address1,
        address2,
        postal,
      } = projRec;

      return (
        <ListItemButton
          key={projId.value}
          divider
          onClick={()=>{
            onChange(projRec);
            handleClose();
          }}
        >
          <Stack 
            direction="row" 
            justifyContent="space-between"
            width={'100%'}
            spacing={2}
          >
            <Stack>
              <Caption text={`工事番号：${projId.value} `} />
              <Typography
                fontSize={16}
                color={grey[800]}
                fontWeight={'bold'}
              >
                {projName.value}
              </Typography>
              <Caption text={`${postal.value ? `${postal.value}〒 ` : ''}${address1.value}${address2.value}`} />
              <Caption text={`${format(parseISO(createTime.value), 'yyyy/MM/dd')}`} />
            </Stack>

            <Stack>
              <Caption text={`ゆめてつAG：${yumeAGNames.value}`} />
              <Caption text={`ここすも担当者：${cocoAGNames.value}`} />
              <Caption text={`工事担当者：${cocoConstNames.value}`} />
            </Stack>
          </Stack>
        </ListItemButton>
      );
    });

  },
  [
    projRecs,
    handleClose,
    onChange,
  ]);

  return (
    <DialogContent dividers sx={{ px: 0 }}>
      <List >
        {options}
      </List>
    </DialogContent>
  );
};