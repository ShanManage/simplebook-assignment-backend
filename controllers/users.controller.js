import firebase from '../firebase.js';

const db = firebase.firestore();

export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const docSnap = await db.collection('users').doc(id).get()

    if (docSnap.exists) {
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
    const userRef = db.collection('users').doc(id);
    const docSnap = await userRef.get();
    if (docSnap.exists) {
      await userRef.set(data, { merge: true });
      res.status(200).send('User updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};