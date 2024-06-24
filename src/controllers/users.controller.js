import firebase from '../../firebase.js';

const db = firebase.firestore();

export const getUser = async (req, res, next) => {
  try {
    const id = req.user.uid;
    const docSnap = await db.collection('users').doc(id).get()

    if (docSnap.exists) {
      const user = docSnap.data();
      user.id = id;
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName) {
      res.status(400).send({ message: 'First Name is required.!' });
    }

    if (!email) {
      res.status(400).send({ message: 'E-mail is required.!' });
    }

    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (!userSnapshot.empty) {
      return res.status(400).send({ message: 'E-mail already exists.!' });
    }
    
    const data = {
      firstName,
      lastName,
      email,
      phone: '',
      address: ''
    }
    await db.collection('users').doc(req.user.uid).set(data);
    res.status(200).send('User created successfully');
  } catch (error) {
    res.status(400).send({ message: error.message });
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
      res.status(404).send({ message: 'user not found' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};