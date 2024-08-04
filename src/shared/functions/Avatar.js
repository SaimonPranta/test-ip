export function readImage(img) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!['jpg', 'jpeg', 'png', 'gif'].includes(img.type.split('/')[1])) {
        reject('Invalid image type.');
      } else if (img.size > 1048576) {
        reject('Image is too large');
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        resolve(reader.result);
      };
    } catch (error) {
      reject('Unexpected error');
    }
  });
}
