import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Radio } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { getProjectsByCustGroupId, SearchItems } from '../../../../api/getProjectsByCustGroupId';
import { TypeOfProjForm, KeyOfProjForm } from '../../../../form';


export const SearchDialog = (props: {
  open: boolean,
  handleClose: ()=>void
}) => {
  const { open, handleClose } = props;
  const [records, setRecords] = useState<SearchItems | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { setFieldValue, values: { custGroupId } } = useFormikContext<TypeOfProjForm>();

  const handleCopy = () => {
    if (selected !== null && records) {
      const { postal, address1, address2 } = records[selected];
      console.log('Copying!');

      setFieldValue('postal' as KeyOfProjForm, postal);
      setFieldValue('address1' as KeyOfProjForm, address1);
      setFieldValue('address2' as KeyOfProjForm, address2);

    }

    handleClose();

  };

  useEffect(()=> {
    if (custGroupId && open) {
      setLoading(true);
      getProjectsByCustGroupId(custGroupId)
        .then((resp) => {
          setRecords(resp);
          setLoading(false);
        });
    }
  }, [custGroupId, open]);

  const isWithRecord = Boolean(records?.length);

  const title = isWithRecord ? '過去プロジェクトの工事場所をコピーしますか。' : '';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {loading &&
          <CircularProgress />}
        {!isWithRecord && !loading &&
          <>
            選択した顧客に案件がありません。
          </>}
        {isWithRecord && !loading &&
          <List>
            {records?.map(({ constructionName, postal, address1, address2 }, idx) => {
              return (
                <ListItem
                  key={constructionName}
                  divider
                >
                  <ListItemButton onClick={()=>setSelected(idx)}>
                    <ListItemIcon>
                      <Radio checked={selected === idx} disableRipple />
                    </ListItemIcon>
                    <ListItemText
                      primary={constructionName}
                      secondary={`${postal} ${address1}${address2}`}
                    />
                  </ListItemButton>
                </ListItem>

              );
            })}
          </List>}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          キャンセル
        </Button>
        {isWithRecord &&
          <Button variant="contained" disabled={selected === null} onClick={handleCopy}>
            OK
          </Button>}

      </DialogActions>

    </Dialog>
  );
};