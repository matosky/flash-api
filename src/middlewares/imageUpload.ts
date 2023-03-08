import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // use original filename
  },
});

export const    Upload = multer({
  storage: storage,
});

// export const Upload = multer({ dest: 'uploads/' })
