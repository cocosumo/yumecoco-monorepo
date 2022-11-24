import { Grid, Button, Stack, Pagination } from '@mui/material';
import { PageSubTitle } from '../../../../../components/ui/labels';
import AddIcon from '@mui/icons-material/Add';
import { MemoList } from './MemoList';
import { useContext, useEffect, useState } from 'react';
import { MemoContext } from './memoForm/MemoContext';
import { useFormikContext } from 'formik';
import { CustomerForm } from '../../form';
import { MemoColumnContainer } from './MemoColumnContainer';

const maxItems = 6;

export const MemoColumn = () => {
  const { values } = useFormikContext<CustomerForm>();
  const { id, customers: [mainCust] } = values;
  const { handleOpen, memoList } = useContext(MemoContext)!;
  const [pageNum, setPageNum] = useState(1);
  const pageCount = Math.ceil(( memoList?.length ??  0) /  maxItems);
  const [memosInPage, setMemosInPage] = useState<typeof memoList>(memoList?.slice(0, maxItems));

  const handleMemoPageChange = (_1: any, page: number) => {
    setPageNum(page);
  };

  useEffect(()=>{
    const offset = (pageNum - 1) * maxItems;
    setMemosInPage(memoList?.slice(offset, offset + maxItems));
  }, [pageNum, memoList]);

  return (
    <MemoColumnContainer>

      <Grid container item xs={12}
        spacing={2}
      >
        <PageSubTitle label={'メモ'} xs={7} />
        <Grid item xs={5}>
          <Button
            variant="outlined" startIcon={<AddIcon />}
            fullWidth onClick={
            ()=> handleOpen({
              custGroupId: id || '',
              custName: mainCust.custName,

            })
          }
          >
            追加
          </Button>
        </Grid>
      </Grid>
      {pageCount > 0 &&
      <Pagination
        count={pageCount}
        onChange={handleMemoPageChange}
        variant="outlined"
        siblingCount={0}
        boundaryCount={1}
        size={'small'}
      />}

      <MemoList memos={memosInPage ?? []} custName={mainCust.custName} custGroupId={id || ''} />

    </MemoColumnContainer>

  );
};