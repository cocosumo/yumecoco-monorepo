

import { TransitionGroup } from 'react-transition-group';
import {
  Collapse,
  IconButton,
  Typography,
  ListItemText,
  Divider,
  ListItem,
  List,
  Stack,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useContext, useEffect, useState } from 'react';
import { MemoItemMenu, MenuProps } from './MemoItemMenu';
import { MemoContext } from './memoForm/MemoContext';
import { MemoFormType } from './memoForm/form';
import { format, parseISO } from 'date-fns';
import { deleteMemoById } from 'api-kintone';
import { MemoAvatar } from './MemoAvatar';

interface MemoListProps {
  memos: Array<MemoFormType>,
  custName: string,
  custGroupId: string,
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
        <MemoAvatar memoType={memoType} />

        <ListItemText
          primary={
            <Stack direction={'row'} justifyContent="space-between">
              <span>
                {memoType}
                <br />
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
              {contents}
              {' '}
              <br />
              {format(parseISO(createDate), 'yyyy年MM月dd日')}
            </Stack>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};


export const MemoList = (props: MemoListProps) => {
  const { memos, custName, custGroupId } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MemoFormType>();

  const { handleOpen, handleUpdateMemoList } = useContext(MemoContext)!;

  const handleClickMenu: MemoItemProps['handleClickMenu'] = (e, memoItem) => {
    setSelectedMenuItem(memoItem);
    setAnchorEl(e.currentTarget);
  };

  const handleClose: MenuProps['handleClose'] = (memoItem, method) => {

    switch (method) {
      case '編集':
        handleOpen({ ...memoItem, custName, custGroupId });
        break;

      case '削除':
        if (selectedMenuItem) {
          deleteMemoById(selectedMenuItem?.memoId)
            .then(() => {
              handleUpdateMemoList(custGroupId);
            });

        }
        break;
    }

    setAnchorEl(null);
  };


  useEffect(()=>{
    if (custGroupId) {
      handleUpdateMemoList(custGroupId);
    }
  }, [custGroupId]);

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
      {selectedMenuItem && <MemoItemMenu memoItem={selectedMenuItem} {...{ handleClose, anchorEl }} />}

    </>
  );
};
