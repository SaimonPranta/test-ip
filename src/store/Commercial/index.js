/* eslint-disable import/no-anonymous-default-export */
import { ADD_COMMERCIAL } from './actions';
const initState = {
    _id: "",
    name: "",
    workingEnvironment: "",
    userName: "",
    phone: "",
    email: "",
}

export default (state = initState, { type, payload }) => {

    switch (type) {
        case ADD_COMMERCIAL:
            return {
                ...state,
                _id: payload._id,
                name: payload.name,
                workingEnvironment: payload.workingEnvironment,
                userName: payload.userName,
                phone: payload.phone,
                email: payload.email,
            }
        default:
            return state
    }
}

// export default index