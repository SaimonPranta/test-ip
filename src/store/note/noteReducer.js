import { ADD_NOTE } from "./noteConstant";

export const NOTEReducer = (state = { noteItems: [] }, action) => {
  //   const { type } = action;
  switch (action.type) {
    case ADD_NOTE:
      const item = action.payload;
      return {
        ...state,
        noteItems: [...state.noteItems, item],
      };

    // case CART_REMOVE_ITEM:
    //   return {
    //     ...state,
    //     noteItems: state.cartItems.filter((x) => x.product !== action.payload),
    //   };
    // case CART_SAVE_SHIPPING_ADDRESS:
    //   return {
    //     ...state,
    //     shippingAddress: action.payload,
    //   };
    // case CART_SAVE_PAYMENT_METHOD:
    //   return {
    //     ...state,
    //     paymentMethod: action.payload,
    //   };
    default:
      return state;
  }
};
