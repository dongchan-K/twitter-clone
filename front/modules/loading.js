export const initialState = {};

const START_LOADING = 'loading/START_LOADING';
const END_LOADING = 'loading/END_LOADING';

export const startLoadingAction = (requestType) => ({
  type: START_LOADING,
  requestType,
});

export const endLoadingAction = (requestType) => ({
  type: END_LOADING,
  requestType,
});

const loading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        [action.requestType]: true,
      };
    case END_LOADING:
      return {
        [action.requestType]: false,
      };
    default:
      return state;
  }
};

export default loading;
