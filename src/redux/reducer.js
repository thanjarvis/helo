const initialState = {
    userId: '',
    username: '',
    profilePic: ''
}

const GET_USER = 'GET_USER'


export const getUser = (userId, username, profilePic) => {
    // console.log('entered into getUser', userId, username, profilePic);
    return{
        type: GET_USER,
        payload: {
            userId,
            username,
            profilePic
        }
    }
    
}

export default function reducer(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_USER:
            // console.log('hit case GET_USER');
            return{
                ...state,
                userId: payload.userId,
                username: payload.username,
                profilePic: payload.profilePic
            }            
        default:
            // console.log('reducer default case', state);
            return state
    }
}