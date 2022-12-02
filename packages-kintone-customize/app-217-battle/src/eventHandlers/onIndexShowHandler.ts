
export const onIndexShowHandler = () => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);
  console.log('Index Page');
};
