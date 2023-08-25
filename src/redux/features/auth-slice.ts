import {createSlice,PayloadAction} from "@reduxjs/toolkit"

interface initialState{
    value:{
        userId:string,
        token:string,
        isLoggedIn:boolean
    }
}


export const initialState:initialState={
    value:{
        userId:"",
        token:'',
        isLoggedIn:false
    }
}

export const auth=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logOut:()=>{
            return initialState
        },

        logIn:(state,action:PayloadAction<{userId:string,token:string}>)=>{
            return {
                value:{
                    userId:action.payload.userId,
                    token:action.payload.token,
                    isLoggedIn:true
                }
            }
        }
    }
})

export const {logOut,logIn}=auth.actions
export default auth.reducer