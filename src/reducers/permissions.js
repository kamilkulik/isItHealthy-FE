// premissions reducer:

const permissionsReducerDefaultState = {
  cameraAccess: 'denied',
  photosAccess: 'denied',
};
export default (state = permissionsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CAMERA_ACCESS':
      return {
        ...state,
        cameraAccess: action.status
      }
    case 'SET_PHOTOS_ACCESS':
      return {
        ...state,
        photosAccess: action.status
      }
    default:
      return state
  };
};