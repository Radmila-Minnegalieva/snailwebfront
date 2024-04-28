const initialState = {
    savedCardId: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_CARD_ID':
        return {
          ...state,
          savedCardId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;