// ************ Require's ************
const express = require('express');
const fs = require('fs');
const multer = require('multer')
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/**************MULTER CONFIG */
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null ,'./public/images/products');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage: fileStorageEngine})
/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('products/:id', productsController.destroy); 


module.exports = router;
