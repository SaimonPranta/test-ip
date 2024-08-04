export const WATCH_ALL_VIDEOS = 'WATCH_ALL_VIDEOS';
export const WATCH_SINGLE_VIDEO = 'WATCH_SINGLE_VIDEO';
export const WATCH_SEARCH_RESULT = 'WATCH_SEARCH_RESULT';
export const WATCH_MATCHING_RESULT = 'WATCH_MATCHING_RESULT';
export const WATCH_SEARCH_TEXT = 'WATCH_SEARCH_TEXT';

export const WATCH_SEARCH_ALL_HISTORY = 'WATCH_SEARCH_ALL_HISTORY';
export const WATCH_SEARCH_HISTORY_ADD = 'WATCH_SEARCH_HISTORY_ADD';
export const WATCH_SEARCH_HISTORY_REMOVE = 'WATCH_SEARCH_HISTORY_REMOVE';

export const WATCH_SEARCH_ALL_FILTERS = 'WATCH_SEARCH_ALL_FILTERS';

export const WATCH_ALL_COMMENTS = 'WATCH_ALL_COMMENTS';
export const WATCH_ADD_COMMENTS = 'WATCH_ADD_COMMENTS';
export const WATCH_COMMENTS_EDIT = 'WATCH_COMMENTS_EDIT';
export const WATCH_COMMENTS_DELETE = 'WATCH_COMMENTS_DELETE';
export const WATCH_COMMENTS_REACTION = 'WATCH_COMMENTS_REACTION';

export const WATCH_ADD_COMMENT_REPLY = 'WATCH_ADD_COMMENT_REPLY';
export const WATCH_COMMENT_REPLY_DELETE = 'WATCH_COMMENT_REPLY_DELETE';
export const WATCH_COMMENT_REPLY_EDIT = 'WATCH_COMMENT_REPLY_EDIT';
export const WATCH_COMMENT_REPLY_REACTION = 'WATCH_COMMENT_REPLY_REACTION';


export function watchAllVideos() {
  return { type: WATCH_ALL_VIDEOS };
}

export function watchSingleVideo(id) {
  return { type: WATCH_SINGLE_VIDEO, payload: id };
}

export function watchVideosSearch(searchData) {
  return { type: WATCH_SEARCH_RESULT, payload: searchData };
}

export function watchVideosMatching(matchingData) {
  return { type: WATCH_MATCHING_RESULT, payload: matchingData };
}

export function watchSearchText(text) {
  return { type: WATCH_SEARCH_TEXT, payload: text };
}

export function watchSearchAllHistory() {
  return { type: WATCH_SEARCH_ALL_HISTORY };
}

export function watchSearchHistoryAdd(searchData) {
  return { type: WATCH_SEARCH_HISTORY_ADD, payload: searchData };
}

export function watchSearchHistoryRemove(id) {
  return { type: WATCH_SEARCH_HISTORY_REMOVE, payload: id };
}

export function watchSearchAllFilters() {
  return { type: WATCH_SEARCH_ALL_FILTERS };
}

export function watchAllComments() {
  return { type: WATCH_ALL_COMMENTS };
}
export function watchAddComment(comment) {
  return { type: WATCH_ADD_COMMENTS, payload: comment };
}
export function watchCommentEdit(editCommentId, editComment) {
  return { type: WATCH_COMMENTS_EDIT, payload: {editCommentId, editComment} };
}
export function watchCommentDelete(id) {
  return { type: WATCH_COMMENTS_DELETE, payload: id };
}

export function watchCommentReaction(commentReactionId, user, commentReaction) {
  return { type: WATCH_COMMENTS_REACTION, payload: { commentReactionId, user, commentReaction }  };
}

export function watchAddCommentReply(replyAddId, reply) {
  return { type: WATCH_ADD_COMMENT_REPLY, payload: { replyAddId, reply } };
}

export function watchCommentReplyDelete(commentId, replyId) {
  return { type: WATCH_COMMENT_REPLY_DELETE, payload: {commentId, replyId} };
}

export function watchCommentReplyEdit(commentId, editComment, replyEditId) {
  return { type: WATCH_COMMENT_REPLY_EDIT, payload: {commentId, editComment, replyEditId} };
}

export function watchCommentReplyReaction(commentId, replyId, user, replyReaction) {
  return { type: WATCH_COMMENT_REPLY_REACTION, payload: { commentId, replyId, user, replyReaction }  };
}