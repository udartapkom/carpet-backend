const multer  = require('multer')
//const upload = multer({ dest: 'uploads/images/' })

const storage = multer.diskStorage({
    destination(req, productPhoto, cb) {
        cb(null, 'uploads/images/')
    },
    filename(req, productPhoto, cb) {
        cb(null, productPhoto.originalname)
    }
})
/* const fileAccess = (req, productPhoto) => {
    const path = './' + req.file.name;

    fs.access(path, fs.F_OK, (err) => {
    
        if(err){
            return res.status(400).json({message: "Такой файл уже существует!"})
        }
        res.send(req.file);
    })
} */


const types = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, productPhoto, cb) => {
    if(types.includes(productPhoto.mimetype)){

        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({storage, fileFilter})