
import { Typography, Stack, Paper, Box, List, Button } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { getAllMemosByGroupId } from '../../api/kintone/memo/GET';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Memo from '../ui/cards/Memo';

import InputMemoDialog from '../ui/dialogs/InputMemoDialog';
import Caption from '../ui/typographies/Caption';
import CustomerFormContext from './../../context/CustomerFormContext';
import memoReducer from '../../reducers/memo/memo';
import initialMemoState from '../../stores/memo';


export default function Memos() {

  const [memoOpen, setMemoOpen] = useState(false);
  const [formState, dispatch]  = useReducer(memoReducer, initialMemoState);

  const [memoList, setMemoList] = useState<CustomerMemoTypes.SavedData[] | undefined>();
  const groupId = useParams().groupId;

  const custFormContext = useContext(CustomerFormContext);
  const custFormState = custFormContext!.formState;


  useEffect(()=>{
    if (!memoOpen){
      getAllMemosByGroupId(groupId).then((res) => {
        setMemoList(res as unknown as CustomerMemoTypes.SavedData[]);
      });

    }
  }, [memoOpen]);

  const handleClickMemo = (memo: CustomerMemoTypes.SavedData) => {
    dispatch({ type: 'SET_EDIT', payload: memo });
    setMemoOpen(true);
  };

  const handleMemoOpen = () => {
    const {  customers, agents } = custFormState;
    const { coco1, coco2, yume1, yume2 } = agents;
    dispatch({ type: 'SET_INITIAL', payload: {
      groupId: groupId ?? '',
      custId: customers[0].custId ?? '',
      custName: customers[0].fullName.value,
      cocoAg: [coco1.value, coco2.value],
      yumeAg: [yume1.value, yume2.value],
    } });
    setMemoOpen(true);
  };



  return (
    <Paper>
      <Box p={2}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">【メモ】</Typography>
            <Button variant="contained" onClick={handleMemoOpen} size="small" startIcon={<AddCommentIcon />}>
              メモを追加
            </Button>
            <InputMemoDialog state={{ memoOpen, setMemoOpen, formState, dispatch }} />
          </Stack>

          { memoList &&
          <>
            <Caption text={`${memoList.length}件`} />
            <List>
            {memoList.map((item) => <Memo key={item.$id.value} record={item} handleTouched={()=>handleClickMemo(item)}  />)}
            </List>
          </>
          }
          {!memoList && <Typography variant="caption">メモがありません。</Typography> }
        </Stack>

      </Box>
    </Paper>
  );
}