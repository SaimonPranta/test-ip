export const INVESTOR_ALL_POPULAR = 'INVESTOR_ALL_POPULAR';
export const INVESTOR_ALL_CONTINENTS = 'INVESTOR_ALL_CONTINENTS';
export const INVESTOR_ADD_TO_CART = 'INVESTOR_ADD_TO_CART';
export const INVESTOR_REMOVE_TO_CART = 'INVESTOR_REMOVE_TO_CART';
export const INVESTOR_PROJECT_ADD = 'INVESTOR_PROJECT_ADD';
export const INVESTOR_PROJECT_DELETE = 'INVESTOR_PROJECT_DELETE';
export const INVESTOR_PROJECT_UPDATE = 'INVESTOR_PROJECT_UPDATE';

export const INVESTOR_ALL_COMMENTS = 'INVESTOR_ALL_COMMENTS';
export const INVESTOR_ADD_COMMENTS = 'INVESTOR_ADD_COMMENTS';
export const INVESTOR_COMMENTS_EDIT = 'INVESTOR_COMMENTS_EDIT';
export const INVESTOR_COMMENTS_DELETE = 'INVESTOR_COMMENTS_DELETE';

export function investorAllPopular() {
  return { type: INVESTOR_ALL_POPULAR };
}
export function investorAllContinents() {
  return { type: INVESTOR_ALL_CONTINENTS };
}
export function investorAddToCart(project) {
  return { type: INVESTOR_ADD_TO_CART, payload: project };
}
export function investorProjectAdd(project) {
  return { type: INVESTOR_PROJECT_ADD, payload: project }
}
export function investorRemoveToCart(id) {
  return { type: INVESTOR_REMOVE_TO_CART, payload: id };
}

export function investorProjectDelete(id) {
  return { type: INVESTOR_PROJECT_DELETE, payload: id }
}

export function investorProjectUpdate(updateProject) {
  return { type: INVESTOR_PROJECT_UPDATE, payload: updateProject }
}
export function investorAllComments() {
  return { type: INVESTOR_ALL_COMMENTS };
}
export function investorAddComment(comment) {
  return { type: INVESTOR_ADD_COMMENTS, payload: comment };
}
export function investorCommentEdit(editCommentId, editComment) {
  return { type: INVESTOR_COMMENTS_EDIT, payload: { editCommentId, editComment } };
}
export function investorCommentDelete(id) {
  return { type: INVESTOR_COMMENTS_DELETE, payload: id };
}