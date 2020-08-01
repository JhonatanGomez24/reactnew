import { actions } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
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