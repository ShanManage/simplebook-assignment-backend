import express from 'express'
import {
  getUser,
  createUser,
  updateUser,
} from '../controllers/users.controller.js'

const router = express.Router()

router.get('/', getUser);

router.post('/', createUser) 

router.put('/:id', updateUser);

export default router