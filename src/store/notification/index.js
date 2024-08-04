import {
  PUSH_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  PULL_NOTIFICATION,
  READ_NOTIFICATIONS,
} from "./action";

export default (state = [], { type, payload }) => {
  // console.log(state, 'state');
  switch (type) {
    case PUSH_NOTIFICATIONS:
      return [...payload, ...state];
    case UPDATE_NOTIFICATION:
      return [payload, ...state.filter((not) => not.id !== payload.id)];
    case PULL_NOTIFICATION:
      return state.filter((not) => not.id !== payload);
    case READ_NOTIFICATIONS:
      return state.map((not) => {
        if (payload.includes(not.id)) {
          not.read = true;
        }
        return not;
      });
    default:
      return state;
  }
};
