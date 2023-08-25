import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    value: {
        saved: string[];
    };
}

const initialState: InitialState = {
    value: {
        saved: [],
    },
};

const save = createSlice({
    name: "save",
    initialState,
    reducers: {
        saveJobs(state, action: PayloadAction<string>) {
            if(action){
                return {
                    value:{
                        saved: [action.payload]
                    }
                 }
            }
             
        },
    },
});

export const { saveJobs } = save.actions;
export default save.reducer;
