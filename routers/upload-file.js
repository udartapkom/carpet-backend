const router = require('express').Router(); 
const { uploadFiles, deleteFile, readFilesInDir } = require('../controllers/files-uploads');
const imageUploadMiddleware = require('../middleware/image-upload-middleware')

router.post('/uploadimage', /* imageUploadMiddleware.single('productPhoto') */ uploadFiles );
router.post('/delimage', deleteFile);
router.post('/getallimages', readFilesInDir)

module.exports = router;