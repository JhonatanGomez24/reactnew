import { actions } from './actions';
  export const reducer = (state, action) => {
  switch (action.type) {

        case actions.setterFacility:
          return {
            ...state,
           facility: {
              ...state.facility,
              [action.name]: action.payload
            }
          }
          case actions.setterFacilityDescription: 
          return {
            ...state,
            facility:{
              ...state.facility,
              [action.description]: action.payload
            }
          }
          
         default:
      return state;
  }
};