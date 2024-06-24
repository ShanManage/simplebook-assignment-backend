import express from 'express'
import multer from 'multer'
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js'
const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage()
});

router.get('/', getProducts)

router.post('/', upload.single('image'), createProduct) 

router.get('/:id', getProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);

export default router