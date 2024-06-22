import firebase from '../firebase.js';
import Product from '../models/product.js';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = doc(db, 'users', id);
    const data = await getDoc(user);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('user not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = doc(db, 'users', id);
    const userDoc = await getDoc(user);
    if (userDoc.exists()) {
      await updateDoc(user, data);
      res.status(200).send('user info updated successfully');
    } else {
      res.status(404).send('user not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};