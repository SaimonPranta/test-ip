import {Invite_People_To_Group, Push_Groups, Push_Messages, Push_Groupid} from './type'

export const invitePeopleToGroup = function(payload){
    return {type:Invite_People_To_Group, payload}

}

export const pushGroups = function(payload){
    return {type: Push_Groups, payload}
}

export const pushMessages = function(msg, groupid){
    
    return {type: Push_Messages, payload: {msg, groupid }}
}


export const pushNewGroupId = function (payload){
    return {type: Push_Groupid, payload}
}