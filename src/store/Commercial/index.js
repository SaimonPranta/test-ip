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
    console.log("type ==>>>", type)
    console.log("payload ==>>>", payload)

    switch (type) {
        case ADD_COMMERCIAL:
            console.log("Hello from the case condition")
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
            console.log("Hello from the Default condition")

            return state
    }
}

// export default index