const cloudinary = require('cloudinary').v2;

const deleteFile = (url) => {
  const imgSplitted = url.split('/');

  const folderName = imgSplitted[imgSplitted.length - 2];
  const fileName = imgSplitted[imgSplitted.length - 1].split('.');

  const public_id = `${folderName}/${fileName[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log('Eliminated');
  });
};

module.exports = { deleteFile };
