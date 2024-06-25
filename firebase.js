import firebase from 'firebase-admin'
import key from './project-key.js'

firebase.initializeApp({
	credential: firebase.credential.cert(key),
  	databaseURL: `https://${key.project_id}.firebaseio.com`,
    storageBucket: `gs://${key.project_id}.appspot.com`
});

export default firebase;