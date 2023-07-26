import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const MAX_AVATAR_SIZE = parseInt(process.env.MAX_AVATAR_SIZE) || 500000;

const storage = multer.diskStorage({
    destination: "../../uploads/",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname) || '.png';
        callback(null, crypto.randomBytes(20).toString('hex') + ext);
    }
});

const uploader = multer({
    storage,
    limits: {
        fileSize: MAX_AVATAR_SIZE
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg")
            return callback(new Error("Only PNG and JPEG files are allowed!"));
        return callback(null, true);
    }
}).single('file');

export default uploader;