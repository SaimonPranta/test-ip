export const SET_POSTS = 'SET_POSTS';
export const SET_SINGLE_POST = 'SET_SINGLE_POST';
export const EDIT_CONTENT = 'EDIT_CONTENT';
export const EDIT_PRIVACY = 'EDIT_PRIVACY';
export const DELETE_POST = 'DELETE_POST';
export const NEW_POST = 'NEW_POST';

export const REACT_POST = 'REACT_POST';
export const SET_REACTS = 'SET_REACTS';
export const UNDOREACT_POST = 'UNDOREACT_POST';

export const REACT_COMMENT = 'REACT_COMMENT';
export const SET_COMMENT_REACTS = 'SET_COMMENT_REACTS';
export const UNDOREACT_COMMENT = 'UNDOREACT_COMMENT';

export const REACT_REPLY = 'REACT_REPLY';
export const SET_REPLY_REACTS = 'SET_REPLY_REACTS';
export const UNDOREACT_REPLY = 'UNDOREACT_REPLY';

export const SET_COMMENTS = 'SET_COMMENTS';
export const COMMENT_POST = 'COMMENT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const SET_REPLIES = 'SET_REPLIES';
export const REPLY_COMMENT = 'REPLY_COMMENT';
export const EDIT_REPLY = 'EDIT_REPLY';
export const DELETE_REPLY = 'DELETE_REPLY';

export function setSinglePost(post) {
  return { type: SET_SINGLE_POST, payload: post };
}
export function setPosts(data) {
  return { type: SET_POSTS, payload: data };
}
export function deletePost(postId) {
  return { type: DELETE_POST, payload: postId };
}
export function editContent(postId, content) {
  return { type: EDIT_CONTENT, payload: { postId, content } };
}
export function editPrivacy(postId, privacy) {
  return { type: EDIT_PRIVACY, payload: { postId, privacy } };
}
export function newPost(post) {
  return { type: NEW_POST, payload: post };
}

export function reactPost(postId, myreact) {
  return { type: REACT_POST, payload: { postId, myreact } };
}
export function setReacts(postId, reacts) {
  return { type: SET_REACTS, payload: { reacts, postId } };
}
export function undoreactPost(postId) {
  return { type: UNDOREACT_POST, payload: postId };
}

export function reactComment(payload) {
  return { type: REACT_COMMENT, payload };
}
export function setCommentReacts(payload) {
  return { type: SET_COMMENT_REACTS, payload };
}
export function undoreactComment(payload) {
  return { type: UNDOREACT_COMMENT, payload };
}

export function reactReply(payload) {
  return { type: REACT_REPLY, payload };
}
export function setReplyReacts(payload) {
  return { type: SET_REPLY_REACTS, payload };
}
export function undoreactReply(payload) {
  return { type: UNDOREACT_REPLY, payload };
}

export function setComments(payload) {
  return { type: SET_COMMENTS, payload };
}
export function commentPost(payload) {
  return { type: COMMENT_POST, payload };
}
export function editComment(payload) {
  return { type: EDIT_COMMENT, payload };
}
export function deleteComment(payload) {
  return { type: DELETE_COMMENT, payload };
}

export function setReplies(payload) {
  return { type: SET_REPLIES, payload };
}
export function replyComment(payload) {
  return { type: REPLY_COMMENT, payload };
}
export function editReply(payload) {
  return { type: EDIT_REPLY, payload };
}
export function deleteReply(payload) {
  return { type: DELETE_REPLY, payload };
}
