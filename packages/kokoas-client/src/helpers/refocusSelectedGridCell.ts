export const refocusSelectedGridCell = () => {
  const el = document.querySelector('div[role="gridcell"][aria-selected="true"]') as HTMLElement;
  console.log('el', el);
 
  el?.focus();
};