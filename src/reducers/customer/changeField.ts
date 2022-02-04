const changeField = (state: CustomerForm, event: InputChangeType, index: number | undefined) : CustomerForm => {
  const name = event.target.name;
  const value = event.target.value;

  if (typeof index === 'undefined') {
    return state;
  } else {
    console.log(name, value, index);
    const customersCopy = [...state.customers];
    const customerCopy = { ...customersCopy[index], [name]: value };
    customersCopy.splice(index, 1, customerCopy);
    return { ...state, customers: customersCopy };
  }
};

export default changeField;