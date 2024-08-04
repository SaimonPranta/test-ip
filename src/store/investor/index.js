import {
  INVESTOR_ADD_COMMENTS,
  INVESTOR_ADD_TO_CART,
  INVESTOR_ALL_COMMENTS,
  INVESTOR_ALL_CONTINENTS, INVESTOR_ALL_POPULAR, INVESTOR_COMMENTS_DELETE, INVESTOR_COMMENTS_EDIT, INVESTOR_PROJECT_ADD, INVESTOR_PROJECT_DELETE, INVESTOR_PROJECT_UPDATE, INVESTOR_REMOVE_TO_CART,
} from "./action";

import invest1 from '../../assets/investor/FakeImage/cmp-1.jpg';
import invest2 from '../../assets/investor/FakeImage/cmp-2.jpg';
import invest3 from '../../assets/investor/FakeImage/cmp-3.jpg';
import invest4 from '../../assets/investor/FakeImage/cmp-4.jpg';

import fakeProjectsData from '../../feature/Investor/fakeData/fakeData.json';
import commentData from "../../feature/Investor/fakeData/comment.json";

const initialState = {
  popular: [invest1, invest2, invest3, invest4],
  continents: fakeProjectsData,
  addToCart: [],
  comments: commentData
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INVESTOR_ALL_POPULAR:
      return {
        ...state,
        continents: state?.continents,
      };
    case INVESTOR_ALL_CONTINENTS:
      return {
        ...state,
        continents: state?.continents,
      };
    case INVESTOR_ADD_TO_CART:
      const continentsData = state?.continents;
      const addToCartData = state?.addToCart;
      const item = action.payload;
      const continentsIndex = continentsData.findIndex(c => c.id === item.id);
      const cartFind = addToCartData.find(c => c.id === item.id);

      let addData;
      if (continentsIndex >= 0 && cartFind?.addToCart === true) {
        delete continentsData[continentsIndex].addToCart;
        addData = addToCartData?.filter(c => c.id !== item.id);
      }
      else if (continentsIndex >= 0) {
        continentsData[continentsIndex].addToCart = true;
        addData = [...addToCartData, item]
      }
      return {
        ...state,
        addToCart: addData
      };
    case INVESTOR_REMOVE_TO_CART:
      {
        const continentsData = state?.continents;
        const addToCartData = state?.addToCart;
        const id = action.payload;
        const continentsIndex = continentsData.findIndex(c => c.id === id);
        const cartFind = addToCartData.find(c => c.id === id);

        if (continentsIndex >= 0 && cartFind?.addToCart === true) {
          delete continentsData[continentsIndex].addToCart;
        }
        return {
          ...state,
          addToCart: state?.addToCart.filter((c) => c.id !== id)
        };
    }
    case INVESTOR_PROJECT_ADD:
      return {
        ...state,
        continents: [...state?.continents, action.payload]
      }
    case INVESTOR_PROJECT_DELETE:
      return {
        ...state,
        continents: state?.continents?.filter(item => item.id !== action.payload)
      }
    case INVESTOR_PROJECT_UPDATE:
      return {
        ...state,
        continents: state?.continents?.map((project) => (project.id === action.payload.id) ? action.payload : project)
      }
    case INVESTOR_ALL_COMMENTS:
      return {
        ...state,
        comments: state?.comments
      };
    case INVESTOR_ADD_COMMENTS:
      return {
        ...state,
        comments: [...state?.comments, action.payload]
      };
    case INVESTOR_COMMENTS_EDIT:
      const { editCommentId, editComment } = action.payload;
      return {
        ...state,
        comments: state?.comments?.map(comment => comment.id === editCommentId ? { ...comment, "comment": editComment } : comment)
      }
    case INVESTOR_COMMENTS_DELETE:
      return {
        ...state,
        comments: state?.comments.filter(comment => comment.id !== action.payload)
      };
    default:
      return state;
  }
};
