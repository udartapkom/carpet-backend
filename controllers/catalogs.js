const Catalog = require('../models/catalog')

const { ERR_MSG } = require('../utils/constants');
const { ConflictErr, BadRequestErr, NotFoundErr } = require('../errors/index');


const errorFunction = (err) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictErr(ERR_MSG.CONFLICT);
      } else if (err.name === 'ValidationError') {
        throw new BadRequestErr(ERR_MSG.BAD_REQUEST);
      } else {
        throw new Error(ERR_MSG.SERVER_ERROR);
      }
}

const createEmptyCatalog = (req, res, next) => {
    const { menuCatalog } = req.body;

    Catalog.create({menuCatalog})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        errorFunction(err);
    })
    .catch(next);
}

const addToCatalogQuality = (req, res, next) => {

    const { menuCatalog } = req.body;
const quality = menuCatalog.quality;
    Catalog.updateOne(
        {$addToSet: {"menuCatalog.quality": quality}}
    )
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        errorFunction(err);
    })
    .catch(next);
}

const addToCatalogDesign = (req, res, next) => {
    const { menuCatalog } = req.body;
    const design = menuCatalog.design;
    Catalog.updateOne(
        {$addToSet: {"menuCatalog.design": design}}
    )
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        errorFunction(err);
    })
    .catch(next);
}

const addToCatalogCountry = (req, res, next) => {
    const { menuCatalog } = req.body;
    const country = menuCatalog.country;
    Catalog.updateOne(
        {$addToSet: {"menuCatalog.country": country}}
    )
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        errorFunction(err);
    })
    .catch(next);
}

const addToCatalogForm = (req, res, next) => {
    const { menuCatalog } = req.body;
    const form = menuCatalog.form;
    Catalog.updateOne(
        {$addToSet: {"menuCatalog.form": form}}
    )
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        errorFunction(err);
    })
    .catch(next);
}

const delFromCatalogQuality = (req, res, next) => {
    const { menuCatalog } = req.body;
    const quality = menuCatalog.quality;
    Catalog.updateOne(
        {$pullAll: {"menuCatalog.quality": quality}}
    )
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        errorFunction(err);
    })
    .catch(next);
}

const delFromCatalogDesign = (req, res, next) => {
    const { menuCatalog } = req.body;
    const design = menuCatalog.design;
    Catalog.updateOne(
        {$pullAll: {"menuCatalog.design": design}}
    )
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        errorFunction(err);
    })
    .catch(next);
}

const delFromCatalogCountry = (req, res, next) => {
    const { menuCatalog } = req.body;
    const country = menuCatalog.country;
    Catalog.updateOne(
        {$pullAll: {"menuCatalog.country": country}}
    )
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        errorFunction(err);
    })
    .catch(next);
}

const delFromCatalogForm = (req, res, next) => {
    const { menuCatalog } = req.body;
    const form = menuCatalog.form;
    console.log(form)
    Catalog.updateOne(
        {$pullAll: {"menuCatalog.form": form}}
    )
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        errorFunction(err);
    })
    .catch(next);
}


const getCatalog = (req, res, next) => {
    Catalog.find()
      .orFail(() => {
        throw new NotFoundErr(ERR_MSG.NOT_FOUND);
      })
      .then((data) => res.send(data))
      .catch(next);
}

module.exports = { 
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
 };