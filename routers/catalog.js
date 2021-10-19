const router = require('express').Router(); 
const { 
    createEmptyCatalog,
    getCatalog,
    addToCatalogQuality, 
    addToCatalogDesign,
    addToCatalogCountry,
    addToCatalogForm,
    delFromCatalogForm,
    delFromCatalogCountry,
    delFromCatalogDesign,
    delFromCatalogQuality
} = require('../controllers/catalogs');

router.post('/createemptycatalog', createEmptyCatalog);
router.post('/addquality', addToCatalogQuality);
router.post('/adddesign', addToCatalogDesign);
router.post('/addcountry', addToCatalogCountry);
router.post('/addform', addToCatalogForm);

router.get('/', getCatalog);

router.delete('/delquality', delFromCatalogQuality);
router.delete('/deldesign', delFromCatalogDesign);
router.delete('/delcountry', delFromCatalogCountry);
router.delete('/delform', delFromCatalogForm);

module.exports = router;