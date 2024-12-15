import multer from 'multer';

const storage = multer.diskStorage({
    // store file in this folder
    destination: "./uploads/images",
});

// storage refers to above defined storage
const upload = multer({
    storage: storage,
    // 3 MB file size limit
    limits: { fileSize: 3 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        // only images and of below format allowed
      const fileTypes = /jpeg|jpg|png/;
      const mimetype = fileTypes.test(file.mimetype);
  
      if (mimetype) {
        cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    }
  });

export default upload;