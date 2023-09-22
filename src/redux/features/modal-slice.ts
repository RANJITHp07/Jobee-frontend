import {createSlice,PayloadAction} from "@reduxjs/toolkit"


interface InitialState {
    value: {
        loading:Boolean
    };
}

const initialState: InitialState = {
    value: {
       loading:true
    },
};

const modal = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal(){
            return {
                value:{
                    loading:false
                }
             }
        },
        
    },
});

export const { openModal} = modal.actions;
export default modal.reducer;