// SET_CAMERA_ACCESS

export const setCameraAccess = (status = 'denied') => ({
  type: 'SET_CAMERA_ACCESS',
  status
});

// SET_PHOTOS_ACCESS

export const setPhotosAccess = (status = 'denied') => ({
  type: 'SET_PHOTOS_ACCESS',
  status
});