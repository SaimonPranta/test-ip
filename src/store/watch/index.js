import {
  WATCH_ALL_VIDEOS, WATCH_SEARCH_RESULT, WATCH_SEARCH_TEXT,
  WATCH_SINGLE_VIDEO, WATCH_MATCHING_RESULT, 
  WATCH_SEARCH_ALL_HISTORY, WATCH_SEARCH_HISTORY_ADD,
  WATCH_SEARCH_HISTORY_REMOVE, WATCH_SEARCH_ALL_FILTERS,
  WATCH_ALL_COMMENTS, WATCH_ADD_COMMENTS, WATCH_COMMENTS_EDIT,
  WATCH_COMMENTS_DELETE, WATCH_COMMENTS_REACTION, WATCH_ADD_COMMENT_REPLY, WATCH_COMMENT_REPLY_DELETE, WATCH_COMMENT_REPLY_EDIT, WATCH_COMMENT_REPLY_REACTION
} from "./action"

import fakeData from "../../feature/Watch/FakeData/watch.json";
import searchHistoryData from "../../feature/Watch/FakeData/search_history.json";
import filterData from "../../feature/Watch/FakeData/filter.json";
import commentData from "../../feature/Watch/FakeData/comment.json";


const initialState = {
  videos: fakeData?.videos,
  video: {},
  // videosSuggest: [],
  videosSearchText: "",
  videosSearch: [],
  searchHistory: searchHistoryData,
  videosMatching: [],
  filters: filterData,
  comments: commentData
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WATCH_ALL_VIDEOS:
      return {
        ...state,
        videos: state?.files,
      };
    case WATCH_SINGLE_VIDEO:
      return {
        ...state,
        video: state?.videos?.find( video => video?.id === action.payload)
      };
    case WATCH_SEARCH_RESULT:
      return {
        ...state,
        videosSearch: state?.videos?.filter((video) => video?.title.toLowerCase().includes(action.payload.toLowerCase()))
      };
    case WATCH_MATCHING_RESULT:
      return {
        ...state,
        videosMatching: state?.videos?.filter((video) => video?.title.toLowerCase().includes(action.payload.toLowerCase()))
      };
    case WATCH_SEARCH_TEXT:
      return {
        ...state,
        videosSearchText: action.payload
      };
    case WATCH_SEARCH_ALL_HISTORY:
      return {
        ...state,
        searchHistory: state?.searchHistory
      };
    
    case WATCH_SEARCH_HISTORY_ADD:
      const historyFilterData =  state?.searchHistory?.filter((history) => ( history?.title === action?.payload?.title ));
      const historyAddData = historyFilterData?.length > 0 ? state?.searchHistory : [...state?.searchHistory, action.payload];

      return {
        ...state,
        searchHistory: historyAddData
      };

    case WATCH_SEARCH_HISTORY_REMOVE:
      return {
        ...state,
        searchHistory: state?.searchHistory?.filter(history => history?.id !== action.payload)
      };
    case WATCH_SEARCH_ALL_FILTERS:
      return {
        ...state,
        filters: state?.filters
      };
    case WATCH_ALL_COMMENTS:
      return {
        ...state,
        comments: state?.comments
      };
    case WATCH_ADD_COMMENTS:
      return {
        ...state,
        comments: [...state?.comments,  action.payload]
      };
    case WATCH_COMMENTS_EDIT:
    { const {editCommentId, editComment} = action.payload;
      return {
        ...state,
        comments: state?.comments?.map(comment => comment.id ===  editCommentId ?  { ...comment, "comment": editComment } : comment )
      }}
    case WATCH_COMMENTS_DELETE:
      return {
        ...state,
        comments: state?.comments.filter(comment => comment.id !== action.payload)
      };
    case WATCH_COMMENTS_REACTION:
      const { commentReactionId, user, commentReaction } = action.payload;

      let newCommentReaction;
      if(commentReaction === "like") {
        newCommentReaction =  state?.comments?.map(comment => comment?.id === commentReactionId ? {
                                  ...comment, 
                                  "like": comment?.like?.find( item => item.username === user?.username) ? comment?.like.filter(item => item.username !== user?.username) : [...comment?.like, user], 
                                  "unlike": comment?.unlike?.find( item => item.username === user?.username) ? comment?.unlike.filter(item => item.username !== user?.username) : comment.unlike
                                } : comment )
      }
      else if(commentReaction === "unlike" ){
        newCommentReaction = state?.comments?.map(comment => comment?.id === commentReactionId ? {
                                  ...comment, 
                                  "unlike": comment?.unlike?.find( item => item.username === user?.username) ? comment?.unlike.filter(item => item.username !== user?.username) : [...comment?.unlike, user],
                                  "like": comment?.like?.find( item => item.username === user?.username) ? comment?.like.filter(item => item.username !== user?.username) : comment?.like
                              } : comment );
      }
      return {
        ...state,
        comments: newCommentReaction
      };
      case WATCH_ADD_COMMENT_REPLY:
        const { replyAddId, reply } = action.payload;
      return {
        ...state,
        comments: state?.comments?.map(comment => comment?.id === replyAddId ? { ...comment, "reply_comment": [...comment?.reply_comment, reply]  } : comment )
      };
      case WATCH_COMMENT_REPLY_DELETE:
      { 
        const { commentId, replyId } = action.payload;
            const updateDeleteReplay = state?.comments?.map( comment => comment.id === commentId ? {
              ...comment, "reply_comment": comment.reply_comment.filter(replay => replay.id !== replyId)
            } : comment);
        return {
          ...state,
          comments: updateDeleteReplay
        }
      }
      case WATCH_COMMENT_REPLY_EDIT:
      {
        const {commentId, editComment, replyEditId} = action.payload;

        const updateEditReplay = state?.comments?.map( comment => comment.id === commentId ? {
          ...comment, "reply_comment": comment.reply_comment.map(replay => replay.id === replyEditId ? { ...replay, "comment": editComment } : replay)
        } : comment);

          return {
            ...state,
            comments: updateEditReplay
        }
      }
      case WATCH_COMMENT_REPLY_REACTION:
      {
        const { commentId, replyId, user, replyReaction } = action.payload;

        let newReplyReaction;
        if(replyReaction === "like") {
          newReplyReaction =  state?.comments?.map(comment => comment?.id === commentId ? {
                                      ...comment, "reply_comment": comment.reply_comment.map( replay => replay.id === replyId ? {
                                          ...replay,
                                          "like": replay?.like?.find( item => item.username === user?.username) ? replay?.like.filter(item => item.username !== user?.username) : [...replay?.like, user], 
                                          "unlike": replay?.unlike?.find( item => item.username === user?.username) ? replay?.unlike.filter(item => item.username !== user?.username) : replay.unlike
                                        } : replay)
                                      } : comment )
        }
        else if(replyReaction === "unlike" ){
          newReplyReaction = state?.comments?.map(comment => comment?.id === commentId ? {
                                      ...comment, "reply_comment": comment.reply_comment.map( replay => replay.id === replyId ? {
                                          ...replay, 
                                          "unlike": replay?.unlike?.find( item => item.username === user?.username) ? replay?.unlike.filter(item => item.username !== user?.username) : [...replay?.unlike, user],
                                          "like": replay?.like?.find( item => item.username === user?.username) ? replay?.like.filter(item => item.username !== user?.username) : replay?.like
                                        } : replay)
                                      } : comment );
        }
        return {
          ...state,
          comments: newReplyReaction
        };
      }
    default:
      return state;
  }
};
