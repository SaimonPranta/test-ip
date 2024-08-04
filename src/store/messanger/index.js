import {
  PUSH_MESSANGER_ROOMS,
  PUSH_MESSANGER_MESSAGE,
  GET_MESSANGER_MESSAGES,
  MAKE_MESSANGER_ROOM_ACTIVE,
  MAKE_MESSANGER_ROOM_INACTIVE,
  REACT_MESSANGER_MESSAGE,
  DELETE_MESSANGER_MESSAGE,
} from "./action";

const initState = [
  // {
  // },
];
export default (state = initState, { type, payload }) => {
  switch (type) {
    case PUSH_MESSANGER_ROOMS:
      if (payload.offset === 0) {
        return payload.rooms;
      }
      let rooms = [];
      for (const room of payload.rooms) {
        const rm = state.find((r) => r.id === room.id);
        if (!rm) {
          rooms.push(room);
        } else {
          state.splice(
            state.findIndex((r) => r.id === rm.id),
            1
          );
          rooms.push({ ...rm, messages: room.messages, user: room.user });
        }
      }
      return [...state, ...rooms];
    case MAKE_MESSANGER_ROOM_ACTIVE:
      return state.map((room) => {
        if (room.user.id === payload) {
          room.status = "active";
        }
        return room;
      });
    case MAKE_MESSANGER_ROOM_INACTIVE:
      return state.map((room) => {
        if (room.user.id === payload) {
          room.status = new Date().toISOString();
        }
        return room;
      });
    case GET_MESSANGER_MESSAGES:
      if (state.findIndex((r) => r.id === payload.id) === -1) {
        return [payload, ...state.filter((r) => r.id === payload.id)];
      } else {
        return state.map((room) => {
          if (room.id === payload.id) {
            room.messages = [...room.messages, ...payload.messages];
          }
          return room;
        });
      }
    case PUSH_MESSANGER_MESSAGE:
      const thisroom = state.find((room) => room.id === payload.roomId);
      return [
        {
          ...thisroom,
          messages: [...(thisroom?.messages || []), payload.message],
        },
        ...state.filter((room) => room.id !== payload.roomId),
      ];
    case REACT_MESSANGER_MESSAGE:
      return state.map((room) => {
        if (room.id === payload.roomId) {
          room.messages = room.messages.map((msg) => {
            if (msg.id === payload.messageId) {
              msg.reacts = [...(msg?.reacts || [])];
              msg.reacts.push(payload.react);
            }
            return msg;
          });
        }
        return room;
      });
    case DELETE_MESSANGER_MESSAGE:
      return state.map((room) => {
        if (room.id === payload.roomId) {
          room.messages = room.messages.map((msg) => {
            if (msg.id === payload.messageId) {
              msg.deleted = true;
            }
            return msg;
          });
        }
        return room;
      });
    case "RESET_MESSANGER":
      return initState;
    default:
      return state;
  }
};
