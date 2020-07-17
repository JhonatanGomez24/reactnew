import { actions } from './actions';
  export const reducer = (state, action) => {
  switch (action.type) {
    case actions.addNewData:
      let newData = {
        type: 'facility',
        random: Math.floor(Math.random() * (20 - 1)) + 1,
      };
      return {
        ...state,
        data: [...state.data, newData],
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
          case actions.deleteData:
            let dataDelete = state.data;
            dataDelete.splice(idx=>idx.id!==action.payload);
            return {
              ...state,
              data: dataDelete,
            };
    default:
      return state;
  }
};