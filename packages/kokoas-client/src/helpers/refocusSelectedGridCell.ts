export const refocusSelectedGridCell = () => {
  const el = document.querySelector('div[role="gridcell"][aria-selected="true"]') as HTMLElement;
 
  el?.focus();
};