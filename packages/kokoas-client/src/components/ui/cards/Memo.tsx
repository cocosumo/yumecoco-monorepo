import EmailIcon from '@mui/icons-material/Email';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ForumIcon from '@mui/icons-material/Forum';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import {  Typography, ListItemText, ListItem, ListItemAvatar, Stack, Divider } from '@mui/material';

import format from 'date-fns/format';
import { ICustmemos } from 'types';


interface NoteProps {
  record: ICustmemos
  handleTouched: () => void
}

const Icon = ({ type }: { type: string }) => {
  switch (type) {
    case '顧客情報':
      return <PermIdentityIcon />;
    case '打ち合わせ':
      return <ForumIcon />;
    case '契約内容':
      return <NordicWalkingIcon />;
    case '工事場所情報':
      return <CarpenterIcon />;
    case '問い合わせ':
      return <ContactSupportIcon />;
    case 'その他':
      return <OtherHousesIcon />;
  }
  return <EmailIcon />;
};

export default function Memo({ record, handleTouched }:NoteProps) {

  const { memoType, contents, createdTime } = record;

  const createTimeText  = format(new Date(createdTime.value), 'yyyy.MM.dd HH:mm');

  return (
    <>
      <ListItem onClick={handleTouched}>
        <ListItemAvatar>
          <Icon type={memoType.value} />
        </ListItemAvatar>

        <ListItemText
          primary={memoType.value}
          secondary={
            <Stack component={'span'}>
              <Typography
                component={'span'}
                variant="body2"
                color="text.primary"
              >
                {contents.value}
              </Typography>
              {createTimeText}

            </Stack>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>

  );
}