// import { DELETE_STORY , GET_ALL_STORY} from "./type";
import * as actionType from "./type";

export const deleteStory = (storyId) => {
  return {
    type: actionType.DELETE_STORY,
    payload: storyId,
  };
};

export const getAllStory = (stories) => {
  return {
    type: actionType.GET_ALL_STORY,
    payload: stories,
  };
};
export const updateStory = (updateStories, uploadImageArray) => {
  return {
    type: actionType.UPDATE_STORY,
    payload: { updateStories, uploadImageArray },
  };
};
export const deleteStorySocket = () => {
  console.log("Socket on reducer action");
  return {
    type: actionType.DELETE_STORY_SOCKET,
    // payload: updateStories,
  };
};
