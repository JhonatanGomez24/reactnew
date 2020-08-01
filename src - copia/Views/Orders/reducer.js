import { actions } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.fetchFacilitys:
      return {
        ...state,
        loadingFacilitys: true,
        errorFacilitys: false,
      };
    case actions.fetchFacilitysSuccess:
      return {
        ...state,
        facilitys: action.payload,
        loadingFacilitys: false,
        errorFacilitys: false,
      };
    case actions.fetchFacilitysError:
      return {
        ...state,
        facilitys: [],
        loadingFacilitys: false,
        errorFacilitys: action.payload,
      };
    default:
      return state;
  }
};