const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config( {
    cloud_name : process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KRY,
    api_secret :process.env.CLOUD_API_SECRET
}
)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Wonderlust_img',
   allowerdformat: async (req, file) => ["pmg" , "jpg" , "jpeg"], 
  },
});


module.exports = {
  cloudinary,
 storage 
}