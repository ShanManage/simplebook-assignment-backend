import firebase from '../../firebase.js';

export const decodeToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  try {
    const decodeValue = await firebase.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  } catch (error) {
    console.error('Firebase Auth Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};