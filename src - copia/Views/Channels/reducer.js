import { actions } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.fetchChannels:
      return {
        ...state,
        loadingChannels: true,
        errorChannels: null,
      };
    case actions.fetchChannelsSuccess:
      return {
        ...state,
        loadingChannels: false,
        errorChannels: null,
        channels: action.payload,
      };
    case actions.fetchChannelsError:
      return {
        ...state,
        loadingChannels: false,
        errorChannels: actions.payload,
        channels: [],
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
    case actions.deleteChannel:
      return {
        ...state,
        loadingDelete: true,
        errorDelete: null,
        successDelete: false,
      };
    case actions.deleteChannelSuccess:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: null,
        successDelete: true,
      };
    case actions.deleteChannelError:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload,
        successDelete: false,
      };
    case actions.setReload:
      return {
        ...state,
        reload: !state.reload,
      };
    default:
      return state;
  }
};