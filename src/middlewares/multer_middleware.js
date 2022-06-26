const path = require('path');
const multer = require('multer')


 // Multer */
 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users/avatars'));
    },
    filename: (req, file, cb) => {
        let file_name = `${Date.now()}_img${path.extname(file.originalname)}`;  
        cb(null, file_name);
    }
})

const uploadFile = multer({ storage });

module.exports = uploadFile;