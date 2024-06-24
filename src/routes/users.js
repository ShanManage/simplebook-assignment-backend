import express from 'express'
import multer from 'multer'
import {
  getUser,
  createUser,
  updateUser,
  updateProfileImage
} from '../controllers/users.controller.js'

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage()
});

router.get('/', getUser);

router.post('/', createUser) 

router.put('/', updateUser);

router.patch('/image', upload.single('image'), updateProfileImage);

export default router