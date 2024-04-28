export const saveCardId = (cardId) => {
    return {
      type: 'SAVE_CARD_ID',
      payload: cardId,
    };
  };