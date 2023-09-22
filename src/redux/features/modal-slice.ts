import {createSlice,PayloadAction} from "@reduxjs/toolkit"


interface InitialState {
    value: {
        open:boolean,
        roomId:number,
    };
}

const initialState: InitialState = {
    value: {
       open:false,
       roomId:0
    },
};

const modal = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal(state,action){
            
            state.value.open=action.payload
           
            
        },

        closeModal(state,action){
            state.value.open=action.payload
        },

        setRoomId(state,action){
            state.value.open=action.payload
        }
        
    },
});

export const { openModal,closeModal,setRoomId } = modal.actions;
export default modal.reducer;