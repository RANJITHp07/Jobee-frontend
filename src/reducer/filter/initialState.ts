  
export interface FilterState {
    selectedWorkModes: string[];
    selectedsalary: number[][];
    selectedcompany: string[];
    experience: [number, number];
    selectedrating:number[];
    location:string[];
    page: { page1: number; page2: number,page3:number };
  }

export const initialState: FilterState = {
    selectedWorkModes: [],
    selectedsalary: [],
    selectedcompany: [],
    experience: [0,100],
    selectedrating:[],
    location:[],
    page: { page1: 3, page2: 3,page3:3},
  };
  