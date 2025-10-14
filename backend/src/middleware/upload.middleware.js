// multer is a middleware for handling multipart/form-date, which is primarily used for uploading files.
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory as Buffer objects
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
}

const upload = multer({ storage: storage, fileFilter:fileFilter, limits:{fileSize: 5 * 1024 * 1024} }); //5MB limit


export default upload;