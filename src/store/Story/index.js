import * as actionType from "./type";

const initialState = {
  deleteStoryId: null,
  Story: null,
  Total_Story: null,
  avatar: null,
  uploadedImage: null,
  success: null,
};

export const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DELETE_STORY:
      const deleteStoryId = action.payload;
      return {
        ...state,
        deleteStoryId: deleteStoryId,
      };

    case actionType.GET_ALL_STORY:
      return {
        ...state,
        Story: action.payload.Story,
        Total_Story: action.payload.Total_Story,
        avatar: action.payload.avatar,
        uploadedImage: action.payload.uploadedImage,
        success: action.payload.success,
      };

    case actionType.UPDATE_STORY:
      const { updateStories, uploadImageArray } = action.payload;
      return {
        ...state,
        Story: updateStories,
        uploadedImage:uploadImageArray
      };
      
    case actionType.DELETE_STORY_SOCKET:
      return {
        ...state,
      };

    default:
      return state;
  }
};
