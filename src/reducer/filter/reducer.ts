import { FilterState  } from "./initialState";
import FilterAction from "./action";

export const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
    switch (action.type) {
      case 'WORK_MODE':
        const { payload: workMode } = action;
        return {
          ...state,
          selectedWorkModes: state.selectedWorkModes.includes(workMode)
            ? state.selectedWorkModes.filter((mode) => mode !== workMode)
            : [...state.selectedWorkModes, workMode],
        };
      case 'SALARY':
        const { payload: salray } = action;
        return {
          ...state,
          selectedsalary: state.selectedsalary.includes(salray)
            ? state.selectedsalary.filter((mode) => mode !== salray)
            : [...state.selectedsalary, salray],
        };
      case 'COMPANY':
        const { payload: company } = action;
        return {
          ...state,
          selectedcompany: state.selectedcompany.includes(company)
          ? state.selectedcompany.filter((mode) => mode !== company)
          : [...state.selectedcompany, company],
      };
    case 'EXPERIENCE':
      const { payload: experience } = action;
      return {
        ...state,
        experience,
      };
    case 'UPDATE_PAGE':
      const { payload: page } = action;
      return {
        ...state,
        page,
      };
      case 'RATING':
        const { payload: rating } = action;
        return {
          ...state,
        selectedrating: state.selectedrating.includes(rating)
        ? state.selectedrating.filter((mode) => mode !== rating)
        : [...state.selectedrating, rating],

    };
    case 'LOCATION':
      const { payload:locations} = action;
      return {
        ...state,
        location: state.location.includes(locations)
        ? state.location.filter((mode) => mode !== locations)
        : [...state.location, locations],
    };
    default:
      return state;
  }
};