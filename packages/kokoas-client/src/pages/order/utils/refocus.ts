export const refocus = (activeEl: HTMLElement, id: string) => {
  
  const returnFocusEl = document.getElementById(id);
  returnFocusEl?.focus();

  if (returnFocusEl) {
    returnFocusEl.removeAttribute('id');
  } else {
    // If it is grid cell, focus on the cell
    const parentCell = activeEl.closest('div[role="gridcell"]');
    const parentRow = parentCell?.closest('div[role="row"]');
    // get aria-rowindex
    const rowIndex = parentRow?.getAttribute('aria-rowindex');

    // get aria-colindex
    const colIndex = parentCell?.getAttribute('aria-colindex');

    // select the cell
    const cellEl = document.querySelector(`div[role="grid"] div[aria-rowindex="${rowIndex}"] div[aria-colindex="${colIndex}"]`) as HTMLElement;

    if (cellEl) {
      cellEl.focus();
    }

  }
};