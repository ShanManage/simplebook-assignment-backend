import firebase from '../../firebase.js';
import Product from '../models/product.js';

const db = firebase.firestore();
const bucket = firebase.storage().bucket();

export const getProducts = async (req, res) => {
  try {
    const productsSnapshot = await db.collection('products').get();
    const productArray = [];

    productsSnapshot.forEach((doc) => {
      const product = new Product(
        doc.id,
        doc.data().name,
        doc.data().description,
        doc.data().price,
        doc.data().image
      );
      productArray.push(product);
    });

    res.status(200).send(productArray);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
} 

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;

    const filename = Date.now() + '-' + req.file.originalname;
    const file = bucket.file(filename);
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (err) => {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong!' });
    });

    stream.on('finish', async () => {
        await file.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

        data.image = publicUrl

        await db.collection('products').add(data);
        res.status(201).send('product created successfully');
    });

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const docSnap = await db.collection('products').doc(id).get()

    if (docSnap.exists) {
      const productData = docSnap.data();
      productData.id = id;
      res.status(200).send(productData);
    } else {
      res.status(404).send({ message: 'product not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
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
      res.status(404).send({ message: 'product not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const updateProductImage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productRef = db.collection('products').doc(id);
    const docSnap = await productRef.get();

    if (!req.file) {
      return res.status(400).send({ message: 'Product Image is required!' });
    }

    if (!docSnap.exists) {
      return res.status(404).send({ message: 'Product not found' });
    }

    const filename = Date.now() + '-' + req.file.originalname;
    const file = bucket.file(filename);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (err) => {
      res.status(500).send({ message: 'Something went wrong!' });
    });

    stream.on('finish', async () => {
      try {
        await file.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  
        const productData = docSnap.data();
        productData.image = publicUrl;
  
        await productRef.set(productData, { merge: true });
        res.status(200).send('Product updated successfully');
      } catch (error) {
        if (!res.headersSent) {
          res.status(500).send({ message: 'Failed to update product image' });
        }
      }
    });

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(400).send({ message: error.message });
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
      res.status(404).send({ message: 'product not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};