import { Chip, ChipProps, Stack } from '@mui/material';
import { useParseQuery } from '../hooks/useParseQuery';
import { KForm, TForm } from '../schema';
import { useMemo } from 'react';
import { pages } from '../../Router';
import qs from 'qs';
import { produce } from 'immer';
import { useStableNavigate } from 'kokoas-client/src/hooks';
import { removeNullFalsyEmptyFromObject } from 'libs';

const FilterChip = (props: ChipProps) => (<Chip size='small' {...props} />); 

export const FilterChips = () => {

  const q = useParseQuery();
  const navigate = useStableNavigate();


  const chipsInfo = useMemo(() => {
    const handleDelete = (newQs: TForm) => {
      const queryStr = qs.stringify(removeNullFalsyEmptyFromObject(newQs), { arrayFormat: 'comma', encode: false });
      navigate(`${pages.projProspectSearch}?${queryStr}`);  
    };

    const result = [] as ChipProps[];

    for (const [key, value] of Object.entries(q)) {
      if (!value) continue;

      switch (key as KForm) {
        case 'ranks':
          (value as string[]).forEach((v) => {
            result.push({
              label: `ランク：${v || '未設定'}`,
              onDelete: () => {
                const newQs = produce(q, (draft) => {
                  draft.ranks = (draft.ranks as string[]).filter((rank) => rank !== v);
                });
                handleDelete(newQs);   
              },
            });
          });
          break;
        case 'custName':
          result.push({
            label: `お客様名：${value}`,
            onDelete: () => {
              const newQs = produce(q, (draft) => {
                delete draft.custName;
              });
              handleDelete(newQs);
            },
          });
          break;
        case 'keyword':
          result.push({
            label: `キーワード：${value}`,
            onDelete: () => {
              const newQs = produce(q, (draft) => {
                delete draft.keyword;
              });
              handleDelete(newQs);
            },
          });
          break;
        case 'memo':
          result.push({
            label: `メモ：${value}`,
            onDelete: () => {
              const newQs = produce(q, (draft) => {
                delete draft.memo;
              });
              handleDelete(newQs);
            },
          });
          break;
        case 'projName':
          result.push({
            label: `工事名：${value}`,
            onDelete: () => {
              const newQs = produce(q, (draft) => {
                delete draft.projName;
              });
              handleDelete(newQs);
            },
          });
          break;
        case 'contractAmtFrom':
          result.push({
            label: `契約予定金額：${(+value).toLocaleString()}万円から`,
            onDelete: () => {
              const newQs = produce(q, (draft) => {
                delete draft.contractAmtFrom;
              });
              handleDelete(newQs);
            },
          });
          break;
        case 'contractAmtTo':
          console.log(value);
          result.push({
            label: `契約予定金額：${(+value).toLocaleString()}万円まで`,
            onDelete: () => {
              const newQs = produce(q, (draft) => {
                delete draft.contractAmtTo;
              });
              handleDelete(newQs);
            },
          });
          break;

        case 'contractDateFrom':
          result.push({
            label: `契約予定日：${value}から`,
            onDelete: () => {
              const newQs = produce(q, (draft) => {
                delete draft.contractDateFrom;
              });
              handleDelete(newQs);
            },
          });
          break;
        case 'contractDateTo':
          result.push({
            label: `契約予定日：${value}まで`,
            onDelete: () => {
              const newQs = produce(q, (draft) => {
                delete draft.contractDateTo;
              });
              handleDelete(newQs);
            },
          });
          break;
          
        default:
          break;
      }

    }

    return result;

  }, [q, navigate]);

  return (
    <Stack
      direction={'row'}
      spacing={1}
    >
      {chipsInfo.map((cprops) => (
        <FilterChip key={cprops.label as string} {...cprops} />
      ))}
    </Stack>
  );
};