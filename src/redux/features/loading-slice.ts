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

const loading = createSlice({
    name: "loading",
    initialState,
    reducers: {
        loadingItems(){
            return {
                value:{
                    loading:false
                }
             }
        },
        
    },
});

export const { loadingItems} = loading.actions;
export default loading.reducer;