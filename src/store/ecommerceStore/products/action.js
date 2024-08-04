export const STORE_ALL_PRODUCTS = 'STORE_ALL_PRODUCTS';
export const STORE_SINGLE_PRODUCT = 'STORE_SINGLE_PRODUCT';
export const STORE_UPLOAD_PRODUCT = 'STORE_UPLOAD_PRODUCT';
export const STORE_UPDATE_PRODUCT = 'STORE_UPDATE_PRODUCT';
export const STORE_DELETE_PRODUCT = 'STORE_DELETE_PRODUCT';
export const STORE_SEARCH_RESULT = 'STORE_SEARCH_RESULT';
export const STORE_SUGGEST_RESULT = 'STORE_SUGGEST_RESULT';
export const STORE_ALL_CATEGORY_LIST = 'STORE_ALL_CATEGORY_LIST';
export const STORE_SINGLE_CATEGORY = 'STORE_SINGLE_CATEGORY';
export const STORE_HOME_SINGLE_CATEGORY = 'STORE_HOME_SINGLE_CATEGORY';
export const STORE_SEARCH_TEXT = 'STORE_SEARCH_TEXT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_TO_CART = 'REMOVE_TO_CART';
export const REMOVE_PRODUCT_TO_CART = 'REMOVE_PRODUCT_TO_CART';
export const REMOVE_ALL_PRODUCT_TO_CART = 'REMOVE_ALL_PRODUCT_TO_CART';


// Product comment 
export const ADD_STORE_PRODUCT_COMMENT = 'ADD_STORE_PRODUCT_COMMENT';
export const ANSWER_ON_COMMENT_STORE_PRODUCT = 'ANSWER_ON_COMMENT_STORE_PRODUCT';
export const STORE_PRODUCT_REPLAY_ON_ANSWER = 'STORE_PRODUCT_REPLAY_ON_ANSWER';
export const STORE_PRODUCT_QUESTION_DELETE = 'STORE_PRODUCT_QUESTION_DELETE';
export const STORE_PRODUCT_ANSWER_DELETE = 'STORE_PRODUCT_ANSWER_DELETE';
export const STORE_PRODUCT_REPLAY_DELETE = 'STORE_PRODUCT_REPLAY_DELETE';
export const STORE_QUESTION_EDIT = 'STORE_QUESTION_EDIT';
export const STORE_ANSWER_EDIT = 'STORE_ANSWER_EDIT';
export const STORE_REPLAY_EDIT = 'STORE_REPLAY_EDIT';
export const STORE_ANSWER_TOGGLE_LIKE = 'STORE_ANSWER_TOGGLE_LIKE';
export const STORE_REPLAY_TOGGLE_LIKE = 'STORE_REPLAY_TOGGLE_LIKE';

// account orders list
export const STORE_ALL_ORDERS = "STORE_ALL_ORDERS";
export const ORDERS_LIST_SEARCH = "ORDERS_LIST_SEARCH";


export function storeAllProducts() {
  return { type: STORE_ALL_PRODUCTS };
}

export function storeSingleProduct(productId) {
  return { type: STORE_SINGLE_PRODUCT, payload: productId };
}

export function storeUploadProduct(product) {
  return { type: STORE_UPLOAD_PRODUCT, payload: product };
}
export function storeUpdateProduct(product) {
  return { type: STORE_UPDATE_PRODUCT, payload: product };
}

export function storeDeleteMyProduct(id) {
  console.log("sdfa", id)
  return { type: STORE_DELETE_PRODUCT, payload: id }
}

export function storeProductsSearch(searchData) {
  return { type: STORE_SEARCH_RESULT, payload: searchData };
}

export function storeProductsSuggest(suggestData) {
  return { type: STORE_SUGGEST_RESULT, payload: suggestData };
}

export function storeAllCategory() {
  return { type: STORE_ALL_CATEGORY_LIST };
}

export function storeSingleCategory(cateName) {
  return { type: STORE_SINGLE_CATEGORY, payload: cateName };
}

export function storeHomeSingleCategory(cateName) {
  return { type: STORE_HOME_SINGLE_CATEGORY, payload: cateName };
}

export function storeSearchText(text) {
  return { type: STORE_SEARCH_TEXT, payload: text };
}

export function storeAddToCart(product) {
  return { type: ADD_TO_CART, payload: product };
}
export function storeRemoveToCart(product) {
  return { type: REMOVE_TO_CART, payload: product };
}

export function storeRemoveProductToCart(product) {
  return { type: REMOVE_PRODUCT_TO_CART, payload: product };
}

export function storeRemoveAllProductToCart() {
  return { type: REMOVE_ALL_PRODUCT_TO_CART };
}

// store account orders 
export function storeAllOrders() {
  return { type: STORE_ALL_ORDERS }
}

export function storeOrdersListSearch(searchData) {
  return { type: ORDERS_LIST_SEARCH, payload: searchData }
}

// store product comment 
export function storeCommentAdd(comment) {
  return { type: ADD_STORE_PRODUCT_COMMENT, payload: comment }
}

export function answerOnComment(id, body) {
  return { type: ANSWER_ON_COMMENT_STORE_PRODUCT, payload: { id, body } }
}

export function deleteQuestion(id) {
  return { type: STORE_PRODUCT_QUESTION_DELETE, payload: id }
}

export function deleteAnswer(id) {
  return { type: STORE_PRODUCT_ANSWER_DELETE, payload: id }
}

export function deleteReplay(id, replayId) {
  return { type: STORE_PRODUCT_REPLAY_DELETE, payload: { id, replayId } }
}

export function storeRelayOnAnswer(id, body) {
  return { type: STORE_PRODUCT_REPLAY_ON_ANSWER, payload: { id, body } }
}

export function storeEditQuestion(id, body) {
  return { type: STORE_QUESTION_EDIT, payload: { id, body } }
}

export function storeEditAnswer(id, body) {
  return { type: STORE_ANSWER_EDIT, payload: { id, body } }
}

export function storeEditReplay(id, replayId, body) {
  return { type: STORE_REPLAY_EDIT, payload: { id, replayId, body } }
}

export function storeAnswerToggleLike(id, body) {
  return { type: STORE_ANSWER_TOGGLE_LIKE, payload: { id, body } };
}

export function storeReplayToggleLike(id, replayId, body) {
  return { type: 'STORE_REPLAY_TOGGLE_LIKE', payload: { id, replayId, body } }
}