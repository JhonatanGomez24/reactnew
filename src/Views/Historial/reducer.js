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
      case actions.fetchRestaurant:
        return {
          ...state,
          restaurant: [],
          loadingRestaurant: true,
          errorRestaurant: null,
        };
      case actions.fetchRestaurantSuccess:
        return {
          ...state,
          restaurant: action.payload,
          loadingRestaurant: false,
          errorRestaurant: null,
        };
      case actions.fetchRestaurantError:
        return {
          ...state,
          restaurant: [],
          loadingRestaurant: true,
          errorRestaurant: action.payload,
        };
    default:
      return state;
  }
};