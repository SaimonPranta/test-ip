export const ADD_COMMERCIAL = "ADD_COMMERCIAL"
export const addCommercial = (data) => {
    console.log("data ==>>>", data)
    return { type: ADD_COMMERCIAL, payload: data };
}