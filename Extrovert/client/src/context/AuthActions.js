export const LoginStart = (userCredentials) => ({
    type:"LOGIN_START",
})

export const LoginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = () => ({
    type:"LOGIN_FAILURE",
    payload:error,
})

export const follow = (userId)=>({
    type:"FOLLOW",
    payload:userId,
})

export const unfollow = (userId)=>({
    type:"UNFOLLOW",
    payload:userId,
})
