import { actions } from './actions';
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.setterChannel:
      return {
        ...state,
        channel: {
          ...state.channel,
          [action.name]: action.payload,
        },
      };
    case actions.setPreviewImage:
      return {
        ...state,
        previewImage: action.payload,
      };
    case actions.fetchData:
      return {
        ...state,
        loadingData: true,
        loadingDataError: null,
      };
    case actions.fetchDataSuccess:
      return {
        ...state,
        loadingData: false,
        loadingDataError: null,
        channel: {
          ...action.payload,
          logo: action.payload.img,
        },
      };
    case actions.fetchDataError:
      return {
        ...state,
        loadingData: false,
        loadingDataError: action.payload,
      }
    default:
      return state;
  }
};