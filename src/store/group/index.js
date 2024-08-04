import {Invite_People_To_Group, Push_Groups, Push_Messages, Push_Groupid} from './type'
let initialState = {

}

export default (state=initialState, {type, payload}) => {
    switch(type){
        case Invite_People_To_Group :
            return {
                ...state,
                readyToInvite : payload
            }
        case Push_Groups: 
            return {
                ...state,
                groups : payload
            }
        case Push_Messages: 
            let currentState = {...state}
            let index
            let groups = currentState.groups
            groups.forEach((item, i)=>{
                if(item._id == payload.groupid){
                    index = i
                }
            })
            currentState.groups[index].messages = payload.msg
            return currentState
        case Push_Groupid: 
         return {
             ...state,
             newgroup: payload
         }

        default: return state
    }
}

