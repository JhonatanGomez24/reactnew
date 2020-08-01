import { actions } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.addNewData:
      let newData = {
        type: 'example',
        random: Math.floor(Math.random() * (20 - 1)) + 1,
      };
      return {
        ...state,
        data: [...state.data, newData],
      };
    case actions.deleteData:
      let dataDelete = state.data;
      dataDelete.splice(action.payload, 1);
      return {
        ...state,
        data: dataDelete,
      };
    default:
      return state;
  }
};
