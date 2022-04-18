import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { MemoItemProps } from './memoForm/MemoContext';




interface Props {
  memos: Array<MemoItemProps>
}

const MemoItem = (props: MemoItemProps) => {
  const { content, title, createDate, commenter } = props;
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="#" />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {commenter}
              </Typography>
              {content + createDate}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};


export const MemoList = (props: Props) => {
  const { memos } = props;
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {memos.map((prop) => <MemoItem key={prop.memoId} { ...prop } />)

      }
      
    </List>
  );
};
