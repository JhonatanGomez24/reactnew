import { actions } from './actions';
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.setterFacility:
      return {
        ...state,
        facility: {
          ...state.facility,
          [action.name]: action.payload,
        },
      };
    case actions.setterFacilityDescription:
      return {
        ...state,
        facility: {
          ...state.facility,
          [action.description]: action.payload,
        },
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
        facility: action.payload,
      };
    case actions.fetchDataError:
      return {
        ...state,
        loadingData: false,
        loadingDataError: action.payload,
      };
    case actions.saveFacility:
      return {
        ...state,
        sendingFacility: true,
        sendingFacilityError: null,
      };
    case actions.saveFacilitySuccess:
      return {
        ...state,
        sendingFacility: false,
        sendingFacilityError: null,
      };
    case actions.saveFacilityError:
      return {
        ...state,
        sendingFacility: false,
        sendingFacilityError: action.payload,
      };
    default:
      return state;
  }
};