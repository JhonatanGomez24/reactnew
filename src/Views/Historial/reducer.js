import { actions } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.fetchData:
      return {
        ...state,
        loadingRestaurants: true,
        errorRestaurants: null,
      };
    case actions.fetchDataSuccess:
      return {
        ...state,
        loadingRestaurants: false,
        errorRestaurants: null,
        restaurants: action.payload,
      };
    case actions.fetchDataError:
      return {
        ...state,
        loadingRestaurants: false,
        errorRestaurants: action.payload,
        restaurants: [],
      };
    case actions.setReload:
      return {
        ...state,
        reload: !state.reload,
      };
    case actions.deleteRestaurant:
      return {
        ...state,
        loadingDelete: true,
        errorDelete: null,
        successDelete: false,
      };
    case actions.deleteRestaurantSuccess:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: null,
        successDelete: true,
      };
    case actions.deleteRestaurantError:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload,
        successDelete: false,
      };
    case actions.showModal:
      return {
        ...state,
        idSelected: action.payload,
        showModal: true,
      };
    case actions.toggleModal:
      return {
        ...state,
        idSelected: -1,
        showModal: false,
      };
    case actions.toggleModalView:
      return {
        ...state,
        showModalView: !state.showModalView,
      };
    case actions.setResSelected:
      return {
        ...state,
        resSelected: action.payload,
      };
    default:
      break;
  }
};