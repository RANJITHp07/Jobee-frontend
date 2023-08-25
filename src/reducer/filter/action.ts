type FilterAction =
   { type: 'WORK_MODE'; payload: string }
  | { type: 'SALARY'; payload: number[] }
  | { type: 'COMPANY'; payload: string }
  | { type: 'EXPERIENCE'; payload: [number, number] }
  | { type: 'RATING'; payload: number }
  | { type: 'LOCATION'; payload: string }
  | { type: 'UPDATE_PAGE'; payload: { page1: number; page2: number,page3:number } 
};

export default FilterAction