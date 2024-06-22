import firebase from '../firebase.js';
import Product from '../models/product.js';

const db = firebase.firestore();

export const getProducts = async (req, res) => {
  try {
    const productsSnapshot = await db.collection('products').get();
    const productArray = [];

    productsSnapshot.forEach((doc) => {
      const product = new Product(
        doc.id,
        doc.data().name,
        doc.data().price,
        doc.data().description
      );
      productArray.push(product);
    });

    res.status(200).send(productArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
} 

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    await db.collection('products').add(data);
    res.status(200).send('product created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const docSnap = await db.collection('products').doc(id).get()

    if (docSnap.exists) {
      res.status(200).send(docSnap.data());
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const productRef = db.collection('products').doc(id);
    const docSnap = await productRef.get();
    if (docSnap.exists) {
      await productRef.set(data, { merge: true });
      res.status(200).send('Product updated successfully');
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productRef = db.collection('products').doc(id);
    const docSnap = await productRef.get();
    if (docSnap.exists) {
      await productRef.delete();
      res.status(200).send('product deleted successfully');
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};