import fakeProduct from "../../../feature/Store/FakeData/products.json";
import fakeCategories from "../../../feature/Store/FakeData/categories.json";
import fakeOrders from "../../../feature/Store/FakeData/orders.json";
import faqFakeData from "../../../feature/Store/FakeData/faq.json";

import {
  STORE_ALL_PRODUCTS,
  STORE_SINGLE_PRODUCT,
  STORE_SEARCH_RESULT,
  STORE_SUGGEST_RESULT,
  STORE_ALL_CATEGORY_LIST,
  STORE_SINGLE_CATEGORY,
  STORE_HOME_SINGLE_CATEGORY,
  STORE_SEARCH_TEXT,
  ADD_TO_CART,
  REMOVE_PRODUCT_TO_CART,
  REMOVE_ALL_PRODUCT_TO_CART,
  REMOVE_TO_CART,
  STORE_UPDATE_PRODUCT,
  STORE_UPLOAD_PRODUCT,
  STORE_ALL_ORDERS,
  ORDERS_LIST_SEARCH,
  ADD_STORE_PRODUCT_COMMENT,
  ANSWER_ON_COMMENT_STORE_PRODUCT,
  STORE_PRODUCT_REPLAY_ON_ANSWER,
  STORE_PRODUCT_QUESTION_DELETE,
  STORE_PRODUCT_ANSWER_DELETE,
  STORE_PRODUCT_REPLAY_DELETE,
  STORE_QUESTION_EDIT,
  STORE_ANSWER_EDIT,
  STORE_REPLAY_EDIT,
  STORE_ANSWER_TOGGLE_LIKE,
  STORE_REPLAY_TOGGLE_LIKE,
  STORE_DELETE_PRODUCT
} from "./action";

const initialState = {
  products: fakeProduct,
  product: {},
  productSearch: [],
  productSuggest: [],
  productsCatagories: fakeCategories,
  productCatagories: [],
  homeProductCatagories: [],
  productSearchText: "",
  addToCart: [],
  ordersList: fakeOrders?.reverse(),
  faq: faqFakeData
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_ALL_PRODUCTS:
      return {
        ...state,
        products: state?.products,
      };
    case STORE_SINGLE_PRODUCT:
      return {
        ...state,
        product: state?.products?.find((product) => product.id === action.payload)
      };
    case STORE_UPLOAD_PRODUCT:
      return {
        ...state,
        products: [...state?.products, action.payload]
      };
    case STORE_UPDATE_PRODUCT:
      return {
        ...state,
        products: state?.products?.map((product) => (product.id === action.payload.id) ? action.payload : product)
      };

    case STORE_DELETE_PRODUCT:
      const filterProduct = state?.products?.filter((product) => product.id !== action.payload)
      return {
        ...state,
        products: filterProduct
      }
    case STORE_SEARCH_RESULT:
      return {
        ...state,
        productSearch: state?.products?.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()))
      };
    case STORE_SUGGEST_RESULT:
      return {
        ...state,
        productSuggest: state?.products?.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()))
      };
    case STORE_ALL_CATEGORY_LIST:
      return {
        ...state,
        productsCatagories: state?.productsCatagories
      };
    case STORE_SINGLE_CATEGORY:
      return {
        ...state,
        productCatagories: state?.products?.filter((product) => (product.cateName === action.payload || product.subCateName === action.payload))
      };
    case STORE_HOME_SINGLE_CATEGORY:
      return {
        ...state,
        homeProductCatagories: state?.products?.filter((product) => action.payload.includes(product.cateName))
      };
    case STORE_SEARCH_TEXT:
      return {
        ...state,
        productSearchText: action.payload
      };
    case ADD_TO_CART:
      const addNewCart = state?.addToCart;
      const addItem = action.payload;
      const addExistingIndex = addNewCart.findIndex(c => c.id === addItem.id);
      if (addExistingIndex >= 0) {
        addNewCart[addExistingIndex].quantity = addNewCart[addExistingIndex].quantity + 1;
        return {
          ...state
        }
      } else {
        // addItem.quantity = 1;
        // addNewCart.push(addItem);
        return {
          ...state,
          addToCart: [...addNewCart, { ...addItem, quantity: 1 }]
        }
      }
    case REMOVE_TO_CART:
      const removeNewCart = state?.addToCart;
      const removeItem = action.payload;
      const removeExistingIndex = removeNewCart.findIndex(c => c.id === removeItem.id);
      if (removeExistingIndex >= 0) {
        let newMinusQuantity = removeNewCart[removeExistingIndex].quantity - 1;
        if (newMinusQuantity === 0) {
          // removeNewCart.splice(removeExistingIndex, 1);
          removeNewCart[removeExistingIndex].quantity = 1
        }
        else {
          removeNewCart[removeExistingIndex].quantity = removeNewCart[removeExistingIndex].quantity - 1;
        }
        return {
          ...state,
        }
      }

    // case ADD_TO_CART:
    //   const newCart = state?.addToCart;
    //   const item = action.payload;
    //   const existing = newCart.find(c => c.id === item.id);
    //   if(existing){
    //       return {
    //         ...state,
    //         addToCart: newCart.map((c) => c.id === existing.id ? item : c.id)
    //       }
    //   } else{
    //     return {
    //       ...state,
    //       addToCart: [...newCart, item]
    //     }
    //   }
    case REMOVE_PRODUCT_TO_CART:
      return {
        ...state,
        addToCart: state?.addToCart.filter((c) => c.id !== action.payload.id)
      };
    case REMOVE_ALL_PRODUCT_TO_CART:
      return {
        ...state,
        addToCart: []
      };

    case STORE_ALL_ORDERS:
      return {
        ...state,
        ordersList: state?.ordersList
      };

    case ORDERS_LIST_SEARCH:

      let conditions = [];

      if (action.payload.name) {
        conditions.push(function (item) {
          return item?.name?.toLowerCase()?.includes(action?.payload?.name?.toLowerCase()?.trim());
        });
      }

      if (action.payload.type) {
        conditions.push(function (item) {
          return item?.type === action.payload.type;
        });
      }

      if (action.payload.status) {
        conditions.push(function (item) {
          return item?.status == action.payload.status;
        })
      }

      if (action.payload.stokes) {
        conditions.push(function (item) {
          return item.stokes == action.payload.stokes;
        })
      }

      const itemsMatchingCondition = fakeOrders.filter(order => conditions.every(con => con(order)));
      return {
        ...state,
        ordersList: itemsMatchingCondition
      };

    case ADD_STORE_PRODUCT_COMMENT:
      return {
        ...state,
        faq: [...state.faq, action.payload]
      };

    case ANSWER_ON_COMMENT_STORE_PRODUCT:
      const { id, body } = action.payload;
      const updateData = state.faq.map((item) => item.id === id ? {
        ...item, "answer": body?.answer, "date": body?.date,
        "reply_comment": body?.reply_comment, "like": body?.like
      } : item)
      return {
        ...state,
        faq: updateData
      };
    case STORE_PRODUCT_QUESTION_DELETE:
      return {
        ...state,
        faq: state.faq.filter((item) => item.id !== action.payload)
      };

    case STORE_PRODUCT_ANSWER_DELETE:
      const updateDeleteAnswer = state.faq.map((item) => item.id === action.payload ? { ...item, "answer": '', "reply_comment": [] } : item)
      return {
        ...state,
        faq: updateDeleteAnswer
      }

    case STORE_PRODUCT_REPLAY_DELETE:
      {
        const { id, replayId } = action.payload;
        const updateDeleteReplay = state.faq.map((item) => item.id === id ? {
          ...item, "reply_comment": item.reply_comment.filter(replay => replay.id !== replayId)
        } : item);

        return {
          ...state,
          faq: updateDeleteReplay
        }
      }
    case STORE_PRODUCT_REPLAY_ON_ANSWER:
      {
        const { id, body } = action.payload;

        const replayBody = {
          id: body?.id,
          answer: body?.answer,
          like: [],
          date: body?.date
        }

        const replayOnAnswer = state.faq.map((item) => item.id === id ? {
          ...item, "reply_comment": [...item?.reply_comment, replayBody]
        } : item);

        return {
          ...state,
          faq: replayOnAnswer
        }
      }
    case STORE_QUESTION_EDIT:
      {
        const { id, body } = action.payload;

        const editQuestion = state.faq.map((item) => item.id === id ? {
          ...item, "question": body
        } : item);

        return {
          ...state,
          faq: editQuestion
        }
      }

    case STORE_ANSWER_EDIT:
      {
        const { id, body } = action.payload;
        const editAnswer = state.faq.map((item) => item.id === id ? {
          ...item, "answer": body
        } : item);

        return {
          ...state,
          faq: editAnswer
        }
      }
    case STORE_REPLAY_EDIT:
      {
        const { id, replayId, body } = action.payload;
        const editReplay = state.faq.map((item) => item.id === id ? {
          ...item, "reply_comment": item?.reply_comment?.map(replay => replay.id === replayId ?
            { ...replay, "answer": body } : replay)
        } : item);

        return {
          ...state,
          faq: editReplay
        }

      }
    case STORE_ANSWER_TOGGLE_LIKE:
      {
        const { id, body } = action.payload;
        const toggleLike = state.faq.map((item) => item.id === id ? {
          ...item, "like": item?.like?.find(like => like.username === body?.username) ? item?.like.filter(likes => likes.username !== body.username) : [...item?.like, body]
        } : item);

        return {
          ...state,
          faq: toggleLike
        }
      }
    case STORE_REPLAY_TOGGLE_LIKE:
      {
        const { id, replayId, body } = action.payload;
        const replayToggleLike = state.faq.map((item) => item.id === id ? {
          ...item, "reply_comment": item?.reply_comment?.map(replay => replay.id === replayId ?
            { ...replay, "like": replay?.like?.find(like => like.username === body?.username) ? item?.like.filter(likes => likes.username !== body.username) : [...item?.like, body] }
            : replay)
        } : item);
        return {
          ...state,
          faq: replayToggleLike
        }
      }

    default:
      return state;
  }
};


