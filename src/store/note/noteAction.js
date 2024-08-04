import { ADD_NOTE } from "./noteConstant";

export const addToNote = (noteObj) => async (dispatch) => {

  dispatch({
    type: ADD_NOTE,
    payload: {
      noteObj,
    },
  });

};
