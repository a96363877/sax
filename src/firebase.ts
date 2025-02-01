// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc,  getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9M4S1blhwbJQ5FUXBkqzv5lsE_3QR4mQ",
  authDomain: "amer-98afb.firebaseapp.com",
  projectId: "amer-98afb",
  storageBucket: "amer-98afb.firebasestorage.app",
  messagingSenderId: "492435134855",
  appId: "1:492435134855:web:86d3abd762bdc1856e5b22",
  measurementId: "G-1YBB0DGJ9L"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addData(data:any){
  localStorage.setItem('visitor',data.id);
  try {
      const docRef = await doc(db, 'pays', data.id!);
      await setDoc(docRef, data)

      console.log("Document written with ID: ", docRef.id)
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e)
      // You might want to show an error message to the user here
    }
}
export const handlePay=async (paymentInfo:any,setPaymentInfo:any)=>{
  try {
    const visitorId = localStorage.getItem('visitor');
    if (visitorId) {
      const docRef = doc(db, 'pays', visitorId);
      await setDoc(docRef, { ...paymentInfo, status: 'pending' }, { merge: true });
      setPaymentInfo((prev: any) => ({ ...prev, status: 'pending' }));
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding payment info to Firestore');
  }
}
export { db};

