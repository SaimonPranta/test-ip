import {
  SET_POSTS,
  SET_REACTS,
  REACT_POST,
  UNDOREACT_POST,
  DELETE_POST,
  DELETE_COMMENT,
  EDIT_COMMENT,
  EDIT_CONTENT,
  EDIT_PRIVACY,
  NEW_POST,
  COMMENT_POST,
  SET_COMMENTS,
  SET_REPLIES,
  REPLY_COMMENT,
  EDIT_REPLY,
  DELETE_REPLY,
  SET_COMMENT_REACTS,
  REACT_COMMENT,
  UNDOREACT_COMMENT,
  SET_REPLY_REACTS,
  REACT_REPLY,
  UNDOREACT_REPLY,
  SET_SINGLE_POST,
} from "./action";

import {
    SET_POSTS,
    NEW_POST,

} from "../posts/action"

const initState = {
  posts: [],
  floading: true,
  tloading: true,
  ftotal: 0,
  ttotal: 0,
};

export default (state = initState, { type, payload }) => {
  console.log(state, "state");
  let newPosts = [];
  switch (type) {
    // * Post stuff

    case SET_SINGLE_POST:
      return {
        ...state,
        posts: [payload],
        tloading: false,
        floading: false,
      };
    case 'Post Loading':
      return {
        ...state,
        posts: [],
        tloading: true,
      };
    case SET_POSTS:
      const newPost = Array.isArray(payload.posts)
        ? payload.posts
        : [payload.posts];
      for (const post of newPost) {
        if (state.posts.findIndex((p) => p.id === post.id) === -1) {
          newPosts.push(post);
        }
      }
      return {
        ...state,
        posts: [...state.posts, ...newPosts],
        ttotal: payload.total,
        tloading: false,
        floading: false,
      };
    case NEW_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case EDIT_CONTENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.contents = [...post.contents, payload.content];
          }
          return post;
        }),
      };
    case EDIT_PRIVACY:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.privacy = payload.privacy;
          }
          return post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
      };

    // * React stuff

    case SET_REACTS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.reacts = payload.reacts;
          }
          return post;
        }),
      };
    case REACT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.myreact = payload.myreact;
          }
          return post;
        }),
      };
    case UNDOREACT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload) {
            post.myreact = "";
          }
          return post;
        }),
      };

    // * React on comment stuff

    case SET_COMMENT_REACTS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment = { ...comment, ...payload.reacts };
              }
              return comment;
            });
          }
          return post;
        }),
      };
    case REACT_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment.liked = payload.liked;
                comment.disliked = payload.disliked;
              }
              return comment;
            });
          }
          return post;
        }),
      };
    case UNDOREACT_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment.liked = false;
                comment.disliked = false;
              }
              return comment;
            });
          }
          return post;
        }),
      };

    // *  React on reply stuff

    case SET_REPLY_REACTS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment.replies = comment.replies.map((reply) => {
                  if (reply.id === payload.replyId) {
                    reply = { ...reply, ...payload.reacts };
                  }
                  return reply;
                });
              }
              return comment;
            });
          }
          return post;
        }),
      };
    case REACT_REPLY:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment.replies = comment.replies.map((reply) => {
                  if (reply.id === payload.replyId) {
                    reply.liked = payload.liked;
                    reply.disliked = payload.disliked;
                  }
                  return reply;
                });
              }
              return comment;
            });
          }
          return post;
        }),
      };
    case UNDOREACT_REPLY:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment.replies = comment.replies.map((reply) => {
                  if (reply.id === payload.replyId) {
                    reply.liked = false;
                    reply.disliked = false;
                  }
                  return reply;
                });
              }
              return comment;
            });
          }
          return post;
        }),
      };

    // * Comment stuff

    case SET_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            for (const comment of payload.comments) {
              if (post.comments.findIndex((c) => c.id === comment.id) === -1) {
                post.comments.push(comment);
              }
            }
          }
          return post;
        }),
      };
    case COMMENT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = [...post.comments, payload.comment];
            post.totalComments += 1;
          }
          return post;
        }),
      };
    case EDIT_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment.contents = [...comment.contents, payload.content];
              }
              return comment;
            });
          }
          return post;
        }),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.filter(
              (comment) => comment.id !== payload.commentId
            );
            if (post.totalComments > 0) {
              post.totalComments -= 1;
            }
          }
          return post;
        }),
      };

    // * Reply stuff

    case SET_REPLIES:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments?.map((comment) => {
              if (comment.id === payload.commentId) {
                for (const comment of payload.replies) {
                  if (
                    comment.replies?.findIndex((c) => c.id === comment.id) ===
                    -1
                  ) {
                    comment.replies.push(comment);
                  }
                }
              }
              return comment;
            });
          }
          return post;
        }),
      };
    case REPLY_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment.replies.push(payload.reply);
                comment.totalReplies += 1;
              }
              return comment;
            });
          }
          return post;
        }),
      };
    case EDIT_REPLY:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment.replies = comment.replies.map((reply) => {
                  if (reply.id === payload.replyId) {
                    reply.contents.push(payload.content);
                  }
                  return reply;
                });
              }
              return comment;
            });
          }
          return post;
        }),
      };
    case DELETE_REPLY:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postId) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === payload.commentId) {
                comment.replies = comment.replies.filter(
                  (reply) => reply.id !== payload.replyId
                );
                if (comment.totalReplies > 0) {
                  comment.totalReplies -= 1;
                }
              }
              return comment;
            });
          }
          return post;
        }),
      };
    case "SET_POST_DEFAULT":
      return initState;
    default:
      return state;
  }
};
