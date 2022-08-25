import QuoteTable from '../QuoteTable/QuoteTable';
import { buzaiListInit } from '../constantDefinition';
import { Button } from '@mui/material';

export const RenderFunc = (arrayHelpers) => {
  const { form } = arrayHelpers;
  const { values } = form;

  // console.log('renderFunc', values);

  // 部材numberの中の最大値を取得する
  const newNumber = () => {
    const newNum = values.items.map((item) => {
      return item.number;
    });
    // console.log('test', newNum);
    return Math.max.apply(null, newNum) + 1;
  };

  return (
    <div>
      <div>
        <QuoteTable arrayHelpers={arrayHelpers} values={values} />
      </div>
      <Button
        variant="outlined"
        onClick={() => arrayHelpers.push({
          ...buzaiListInit,
          number: newNumber(),
        })}
        sx={{
          textAlign: 'right',
        }}
      >
        追加
      </Button>
    </div>
  );
};