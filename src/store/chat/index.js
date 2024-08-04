import {
  OPEN_CHAT,
  CLOSE_CHAT,
  TOGGLE_CHAT,
  PUSH_CHAT_MESSAGES,
  DELETE_CHAT_MESSAGE,
  MAKE_ROOM_ACTIVE,
  MAKE_ROOM_INACTIVE,
  PUSH_CHAT_ROOMS,
  GONE_OFFLINE,
  REACT_CHAT_MESSAGE,
} from "./type";

const initState = [
  // {
  // },
];

export default (state = initState, { type, payload }) => {
  switch (type) {
    case OPEN_CHAT:
      return state.map((chat) => {
        if (chat.id === payload) {
          if (!chat.messages) {
            chat.messages = [];
          }
          chat.active = true;
          chat.minimized = false;
        }
        return chat;
      });
    case CLOSE_CHAT:
      return state.map((chat) => {
        if (chat.id === payload) {
          chat.active = false;
          chat.minimized = false;
        }
        return chat;
      });
    case TOGGLE_CHAT:
      return state.map((chat) => {
        if (chat.id === payload) {
          chat.minimized = !chat.minimized;
        }
        return chat;
      });

    case PUSH_CHAT_ROOMS:
      let rooms = [];
      for (const room of payload) {
        const rm = state.find((r) => r.id === room.id);
        if (rm) {
          rooms.push({ ...rm, status: "active", bar: true });
        } else {
          rooms.push({ ...room, messages: [], status: "active", bar: true });
        }
      }
      return [...rooms];
    case "PUSH_SINGLE_ROOM":
      state.push({ ...payload, bar: false, active: true });
      return [...state];
    case MAKE_ROOM_ACTIVE:
      return state.map((chat) => {
        if (chat.id === payload) {
          chat.status = "active";
          chat.bar = true;
        }
        return chat;
      });
    case MAKE_ROOM_INACTIVE:
      return state.map((chat) => {
        if (chat.id === payload) {
          chat.status = new Date().toISOString();
        }
        return chat;
      });

    case PUSH_CHAT_MESSAGES:
      return state.map((chat) => {
        if (chat.id === payload.roomId) {
          let oldMsgs = [];
          const newMsgs = [];
          if (chat?.messages?.length > 0) {
            oldMsgs = chat.messages;
          }
          for (const msg of payload.messages) {
            if (newMsgs.findIndex((m) => m.id === msg.id) === -1) {
              newMsgs.push(msg);
            }
          }
          const orMsgs = [];
          for (const msg of [...oldMsgs, ...newMsgs]) {
            if (orMsgs.findIndex((m) => m.id === msg.id) === -1) {
              orMsgs.push(msg);
            }
          }
          chat.messages = orMsgs;
          chat.active = true;
        }
        return chat;
      });
    case REACT_CHAT_MESSAGE:
      return state.map((chat) => {
        if (chat.id === payload.roomId) {
          chat.messages = chat.messages.map((msg) => {
            if (msg.id === payload.messageId) {
              msg.reacts = [...(msg?.reacts || [])];
              msg.reacts.push(payload.react);
            }
            return msg;
          });
        }
        return chat;
      });
    case DELETE_CHAT_MESSAGE:
      return state.map((chat) => {
        if (chat.id === payload.roomId) {
          chat.messages = chat.messages.map((msg) => {
            if (msg.id === payload.msgId) {
              msg.deleted = true;
            }
            return msg;
          });
        }
        return chat;
      });

    case GONE_OFFLINE:
      return state.map((chat) => {
        if (chat.user.id === payload) {
          chat.status = new Date().toISOString();
        }
        return chat;
      });
    default:
      return state;
  }
};
