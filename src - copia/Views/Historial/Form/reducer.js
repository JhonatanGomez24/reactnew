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
    case actions.fetchChannels:
      return {
        ...state,
        channels: [],
        loadingChannels: true,
        errorChannels: null,
      };
    case actions.fetchChannelsSuccess:
      return {
        ...state,
        channels: action.payload,
        loadingChannels: false,
        errorChannels: null,
      };
    case actions.fetchChannelsError:
      return {
        ...state,
        channels: [],
        loadingChannels: true,
        errorChannels: action.payload,
      };
    case actions.setterRestaurant:
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          [action.name]: action.payload,
        },
      };
    case actions.addCanales:
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          canales: [...state.restaurant.canales, action.payload],
        },
      };
    case actions.deleteCanales:
      let newCanales = state.restaurant.canales;
      newCanales.splice(action.payload, 1);
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          canales: newCanales,
        },
      };
    case actions.fetchRestaurant:
      return {
        ...state,
      };
    case actions.fetchRestaurantSuccess:
      let newChannels = [];
      action.payload.canales.map((item) => {
        return newChannels.push(item.id);
      });

      let newRestaurant = {
        ...action.payload,
        canales: newChannels,
      };
      return {
        ...state,
        restaurant: newRestaurant,
      };
    case actions.saveRestaurant:
      return {
        ...state,
        loadingSave: true,
        errorSave: null,
      };
    case actions.saveRestaurantSuccess:
      return {
        ...state,
        loadingSave: false,
        errorSave: null,
      };
    case actions.saveRestaurantError:
      return {
        ...state,
        loadingSave: false,
        errorSave: action.payload,
      };
    default:
      return state;
  }
};