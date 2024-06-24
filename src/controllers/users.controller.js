import firebase from '../../firebase.js';

const db = firebase.firestore();
const bucket = firebase.storage().bucket();

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
      address: '',
      image: ''
    }
    await db.collection('users').doc(req.user.uid).set(data);
    res.status(200).send('User created successfully');
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.user.uid;
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

export const updateProfileImage = async (req, res, next) => {
  try {
    const id = req.user.uid;
    const userRef = db.collection('users').doc(id);
    const docSnap = await userRef.get();

    if (!req.file) {
      return res.status(400).send({ message: 'Profile Image is required!' });
    }

    if (!docSnap.exists) {
      return res.status(404).send({ message: 'User not found' });
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
  
        const userData = docSnap.data();
        userData.image = publicUrl;
  
        await userRef.set(userData, { merge: true });
        res.status(200).send('Profile updated successfully');

      } catch (error) {
        if (!res.headersSent) {
          res.status(500).send({ message: 'Failed to update profile image' });
        }
      }
    });

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
