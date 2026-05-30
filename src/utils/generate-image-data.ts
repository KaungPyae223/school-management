export const generateImageData = async (image: File | undefined) => {
  let imageData = {
    image: null,
    imageName: null,
  };
  if (image) {
    imageData.image = await image.arrayBuffer();
    imageData.imageName = image.name;
  }

  return imageData;
};
