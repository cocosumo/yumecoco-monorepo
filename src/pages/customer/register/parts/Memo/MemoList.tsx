

import { TransitionGroup } from 'react-transition-group';
import { 
  Collapse, 
  IconButton, 
  Typography, Avatar, ListItemAvatar,  
  ListItemText, Divider, ListItem, List, Stack,

} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useContext, useState } from 'react';
import { MemoItemMenu, MenuProps } from './MemoItemMenu';
import { MemoContext } from './memoForm/MemoContext';


import { MemoFormType } from './memoForm/form';


interface MemoListProps {
  memos: Array<MemoFormType>,
  custName: string,
  recordId: string,
}

interface MemoItemProps {
  memoItem : MemoFormType,
  handleClickMenu: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, memoItem: MemoFormType )=>void
}


const MemoListItem = (props: MemoItemProps) => {
  const { memoItem, handleClickMenu } = props;
  const { contents, memoType, createDate, commenter } = memoItem;

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="#" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack direction={'row'} justifyContent="space-between">
              <span>
                {memoType}<br/> 
                <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                  {commenter}
                </Typography>

              </span>
              
              
              <IconButton onClick={(e) => handleClickMenu(e, memoItem )}>
                <MoreVertIcon />
              </IconButton>
            </Stack>
            }
          secondary={
            <Stack component={'span'}>
              {contents} <br />
              {createDate}
            </Stack>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};


export const MemoList = (props: MemoListProps) => {
  const { memos, custName, recordId } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MemoFormType>();

  const { handleOpen } = useContext(MemoContext)!;

  const handleClickMenu: MemoItemProps['handleClickMenu'] = (e, memoItem) => {
    setSelectedMenuItem(memoItem);
    setAnchorEl(e.currentTarget);
  };

  const handleClose: MenuProps['handleClose'] = (e, memoItem, method) => {
    console.log('memoItem', memoItem, method);
    switch (method){
      case '編集':
        handleOpen({ ...memoItem, custName, recordId });
        break;

      case '削除':
        break;
    }
    setAnchorEl(null);
  };


  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <TransitionGroup>
        
          {
      memos.map((prop) => (
        <Collapse key={prop.memoId}>
          <div >
            <MemoListItem handleClickMenu={handleClickMenu} memoItem={prop} />
          </div>
        </Collapse>))
      }
        </TransitionGroup>
      
      </List>
      <MemoItemMenu memoItem={selectedMenuItem!} {...{ handleClose, anchorEl }}/>
    </>
  );
};
