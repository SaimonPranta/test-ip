import io from "socket.io-client";

import { deleteStorySocket } from "../store/Story/action";
import {
  setMessages,
  deleteMessage,
  pushRooms,
  makeActive,
  makeInactive,
  goneOffline,
  reactMessage,
} from "../store/chat/action";
import {
  pushNotiffications,
  updateNotiffication,
  pullNotiffication,
  readNotiffications,
} from "../store/notification/action";
import store from "../store";
import {
  setPosts,
  editContent,
  editPrivacy,
  deletePost,
  reactPost,
  setReacts,
  undoreactPost,
  commentPost,
  editComment,
  deleteComment,
  newPost,
  setComments,
  setReplies,
  replyComment,
  editReply,
  deleteReply,
  reactComment,
  setCommentReacts,
  undoreactComment,
  reactReply,
  setReplyReacts,
  undoreactReply,
  setSinglePost,
} from "../store/posts/action";
import {
  push_notifications,
  update_notification,
  pull_notification,
  read_notifications,
  get_timeline,
  get_feed,
  new_post,
  react,
  reacts,
  undo_react,
  comment,
  edit_comment,
  delete_comment,
  edit_content,
  edit_privacy,
  delete_post,
  get_comments,
  push_chat_rooms,
  make_room_active,
  make_room_inactive,
  push_chat_messages,
  delete_chat_message,
  offline_update,
  get_replies,
  reply,
  edit_reply,
  delete_reply,
  react_comment,
  comment_reacts,
  undo_comment_react,
  react_reply,
  reply_reacts,
  undo_reply_react,
  react_chat_message,
  get_single_post,
  push_messagener_rooms,
  push_messanger_message,
  get_messanger_messages,
  make_messanger_room_active,
  make_messanger_room_inactive,
  react_messanger_message,
  delete_messagner_message,
  get_group_posts,
  set_intigator_counts,
  update_intigator_counts,
  get_groups,
  get_group_message,
  new_created_group,
  delete_story,
} from "./type";
import {
  pushMessangerRooms,
  setMessangerMessages,
  pushMessangerMessage,
  makeMessangerActive,
  makeMessangerInactive,
  reactMessangerMessage,
  deleteMessangerMessage,
} from "../store/messanger/action";

import {
  pushGroups,
  pushMessages,
  pushNewGroupId,
} from "../store/group/action";
import { setIndicators, updateIndicator } from "../store/auth/action";
import { peer } from "../shared";

const query = {};
const token = localStorage.getItem("u_t");
if (!!token) {
  query.token = token;
  query.peerId = peer.id;
}

console.log("peer.id", peer.id, peer);

const url =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:2000" || "http://127.0.0.1:2100"
    : "https://backend.www.micple.com" ||
      "https://plmqazoknwsxijbedcuhvrfygt.micple.com";

const socket = io.connect(url, { query });
// console.log(url)
// ? Intigators
socket.on(set_intigator_counts, (payload) => {
  store.dispatch(setIndicators(payload));
});

// socket connection error or user not verified
socket.on("connect_error", (err) => {
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
  console.log(err.data);

  //this error gonna handle when frontend error handle implemented
});

socket.on("global_socket_error", function (err) {
  // do something with err
  console.log(
    "this is error -------------------------------------------------------------------------------",
    err
  );
});

// socket.on('connect_failed', function() {
//   alert('ypp')
//   document.write("Sorry, there seems to be an issue with the connection!");
// })

socket.on("user_not_authenticated", (message) => {
  console.log("i am valid not user messag4e", message);
  socket.off();
});

socket.on(update_intigator_counts, (payload) => {
  store.dispatch(updateIndicator(payload));
});

// ? Chats
socket.on("on_open_single_chat", (payload) => {
  store.dispatch({ type: "PUSH_SINGLE_ROOM", payload });
});
socket.on(push_chat_rooms, (rooms) => {
  store.dispatch(pushRooms(rooms));
});
socket.on(make_room_active, (roomId) => {
  store.dispatch(makeActive(roomId));
});
socket.on(make_room_inactive, (roomId) => {
  store.dispatch(makeInactive(roomId));
});
socket.on(push_chat_messages, ({ roomId, messages }) => {
  console.log(roomId, "roomid");
  console.log(messages, "messages");
  const data = Array.isArray(messages) ? messages : [messages];
  store.dispatch(setMessages(roomId, data));
});
socket.on(react_chat_message, (data) => {
  store.dispatch(reactMessage(data));
});
socket.on(delete_chat_message, ({ roomId, messageId }) => {
  store.dispatch(deleteMessage(roomId, messageId));
});
socket.on(offline_update, (userId) => {
  store.dispatch(goneOffline(userId));
});

// ? Messanger
socket.on(push_messagener_rooms, (payload) => {
  store.dispatch(pushMessangerRooms(payload));
});
socket.on(make_messanger_room_active, (userId) => {
  store.dispatch(makeMessangerActive(userId));
});
socket.on(make_messanger_room_inactive, (userId) => {
  store.dispatch(makeMessangerInactive(userId));
});
socket.on(get_messanger_messages, (data) => {
  store.dispatch(setMessangerMessages(data));
});
socket.on(push_messanger_message, (data) => {
  store.dispatch(pushMessangerMessage(data));
});
socket.on(react_messanger_message, (data) => {
  store.dispatch(reactMessangerMessage(data));
});
socket.on(delete_messagner_message, ({ roomId, messageId }) => {
  store.dispatch(deleteMessangerMessage(roomId, messageId));
});

// Messanger group
socket.on(get_groups, (data) => {
  store.dispatch(pushGroups(data));
});

socket.on(get_group_message, (data, groupid) => {
  store.dispatch(pushMessages(data, groupid));
});

socket.on(new_created_group, (groupid) => {
  store.dispatch(pushNewGroupId(groupid));
});

// ? Notification
socket.on(push_notifications, (notifications) => {
  store.dispatch(pushNotiffications(notifications));
});
socket.on(update_notification, (notification) => {
  store.dispatch(updateNotiffication(notification));
});
socket.on(pull_notification, (id) => {
  store.dispatch(pullNotiffication(id));
});
socket.on(read_notifications, (ids) => {
  store.dispatch(readNotiffications(ids));
});

// ? Posts
socket.on(get_group_posts, (data) => {
  store.dispatch(setPosts(data));
});
socket.on(get_timeline, (data) => {
  store.dispatch(setPosts(data));
});
socket.on(get_single_post, (data) => {
  store.dispatch(setSinglePost(data));
});
socket.on(get_feed, (data) => {
  store.dispatch(setPosts(data));
});
socket.on(new_post, (post) => {
  store.dispatch(newPost(post));
});
socket.on(edit_content, ({ postId, content }) => {
  store.dispatch(editContent(postId, content));
});
socket.on(edit_privacy, ({ postId, privacy }) => {
  store.dispatch(editPrivacy(postId, privacy));
});
socket.on(delete_post, (postId) => {
  store.dispatch(deletePost(postId));
});

// * React
socket.on(react, ({ postId, myreact }) => {
  store.dispatch(reactPost(postId, myreact));
});
socket.on(reacts, ({ reacts, postId }) => {
  store.dispatch(setReacts(postId, reacts));
});
socket.on(undo_react, (postId) => {
  store.dispatch(undoreactPost(postId));
});
// * comment
socket.on(react_comment, (data) => {
  store.dispatch(reactComment(data));
});
socket.on(comment_reacts, (data) => {
  store.dispatch(setCommentReacts(data));
});
socket.on(undo_comment_react, (data) => {
  store.dispatch(undoreactComment(data));
});
// * reply
socket.on(react_reply, (data) => {
  store.dispatch(reactReply(data));
});
socket.on(reply_reacts, (data) => {
  store.dispatch(setReplyReacts(data));
});
socket.on(undo_reply_react, (data) => {
  store.dispatch(undoreactReply(data));
});

// * Comment
socket.on(get_comments, (data) => {
  store.dispatch(setComments(data));
});
socket.on(comment, (data) => {
  store.dispatch(commentPost(data));
});
socket.on(edit_comment, (data) => {
  store.dispatch(editComment(data));
});
socket.on(delete_comment, (data) => {
  store.dispatch(deleteComment(data));
});

// * Reply
socket.on(get_replies, (data) => {
  // console.log("data replies -->", data );
  store.dispatch(setReplies(data));
});
socket.on(reply, (data) => {
  store.dispatch(replyComment(data));
});
socket.on(edit_reply, (data) => {
  store.dispatch(editReply(data));
});
socket.on(delete_reply, (data) => {
  store.dispatch(deleteReply(data));
});

// Delete Story
socket.on(delete_story, () => {
  console.log("called Socket");
  store.dispatch(deleteStorySocket());
});

//storyComment
const deleteReplyStory = (data) => {};
socket.on("story_replay", (data) => {
  store.dispatch(deleteReplyStory(data));
});

export default socket;
