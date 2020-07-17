import { actions } from './actions';
  export const reducer = (state, action) => {
  switch (action.type) {
    case actions.addNewData:
      let newData = {
        type: 'delivery',
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
      case actions.fetchDataSuccess:
        return{
          ...state,
          data:action.payload,
          loadingdata: false,
          errordata: null,
        };
      case actions.fetchData:
        return{
          ...state,
          loadingdata: true,
          errordata: null,
        };
        case actions.fetchDataError:
          return{
            ...state,
            data:[],
            loadingdata: false,
            errordata: action.payload,
          }

    default:
      return state;
  }
};