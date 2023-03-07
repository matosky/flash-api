import multer from "multer";

export const Upload = multer({ dest: 'uploads/' }).single("image")
