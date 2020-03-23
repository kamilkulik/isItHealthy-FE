// photo reducer:

const photoReducerDefaultState = {
  photoUri: '',
};
export default (state = photoReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PHOTO_URI':
      return {
        ...state,
        photoUri: action.photoUri
      }
    default:
      return state
  };
};