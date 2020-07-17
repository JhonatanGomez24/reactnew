import { actions } from './actions';
  export const reducer = (state, action) => {
  switch (action.type) {
   
        case actions.setterChannel: 
          return {
            ...state,
            channel: {
              ...state.channel,
              [action.name]: action.payload
            }
          }
          case actions.setPreviewImage: 
          return {
            ...state,
            previewImage: action.payload
          }
    default:
      return state;
  }
};