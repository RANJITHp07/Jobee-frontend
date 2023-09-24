import {createSlice,PayloadAction} from "@reduxjs/toolkit"

interface initialState{
    value:{
        user:any,
        auth:{
            email:string,
            username:string
        }
    }
}


export const initialState:initialState={
    value:{
        user:{},
        auth:{
            email:'',
            username:''
        }
    }
}

export const user=createSlice({
    name:"user",
    initialState,
    reducers:{
        updateUser(state:any,action: PayloadAction<any>){
         
                  state.value.user={
                    ...state.value.user,
                    [action.payload.key]:action.payload.value
                  }
        },

        getUser(state:any,action: PayloadAction<any>){
           state.value.user= action.payload
           
           
        }
        ,
          getAuth(state:any,action: PayloadAction<any>){
            state.value.auth= action.payload
            
          },

        setAuth(state,action: PayloadAction<any>){
            state.value.auth={
                ...state.value.auth,
                [action.payload.key]:action.payload.value
              }
              console
             
        }
    }
})

export const {updateUser,setAuth,getUser,getAuth}=user.actions
export default  user.reducer