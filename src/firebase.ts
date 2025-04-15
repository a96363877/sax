// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc,  getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKJm0ZPKJtL770jecy8ld89Jgw7tw_DX4",
  authDomain: "chatapp-6ef93.firebaseapp.com",
  databaseURL: "https://chatapp-6ef93-default-rtdb.firebaseio.com",
  projectId: "chatapp-6ef93",
  storageBucket: "chatapp-6ef93.firebasestorage.app",
  messagingSenderId: "28264268558",
  appId: "1:28264268558:web:31442b89d29963ac114d5f",
  measurementId: "G-LH4ZSPQ1YF"
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

