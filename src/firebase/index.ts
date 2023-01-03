import firebaseAdmin from 'firebase-admin';
import * as serviceAccount from '../firebase/firebase-adminsdk.json';

export const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    serviceAccount as firebaseAdmin.ServiceAccount,
  ),
  storageBucket: '',
});
