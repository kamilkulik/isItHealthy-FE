export async function sendToAPI(photo) {
  try {
    const fd = new FormData();
    fd.append('file', {
      uri: photo.uri,
      type: 'jpg',
      name: 'testPhotoName.jpg'
    });

    let apiRes = await fetch('https://corn-dog-vs-apple-be.herokuapp.com/upload-image/', {
      method: 'post',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: fd
    });
    if (apiRes.status > 300) {
      throw new Error('this is an error')
    }
    const response = await apiRes.json()
    return response;
  } catch (e) {
    return false
  }
}