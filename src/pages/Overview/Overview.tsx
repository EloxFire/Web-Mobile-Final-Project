import React, {useState, useEffect, Fragment} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonButton } from '@ionic/react';
import MoneyCard from '../../components/MoneyCard/MoneyCard';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection, query, where } from "firebase/firestore";
import './overview.css';

const Overview: React.FC = () => {

  const monthNames = ["janvier", "févirer", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const [user, setUser] = useState<any>({
    "uid": "N/A",
    "username": "N/A",
    "email": "N/A",
    "emailVerified": "N/A",
    "phone": "N/A",
    "pictureUrl": "N/A"
  });
  const [userExpenses, setUserExpenses] = useState<any>([]);


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in");
        setUser({
          "uid": user.uid,
          "username": user.displayName ? user.displayName : null,
          "email": user.email,
          "emailVerified": user.emailVerified,
          "phone": user.phoneNumber ? user.phoneNumber : "",
          "pictureUrl": user.photoURL ? user.photoURL : ""
        })
      } else {
        console.log("User signed out");
      }
    });

    const db = getFirestore();
    const expenseRef = collection(db, 'expenses');
    const q = query(expenseRef, where("user_uid", "==", user.uid));

    getDocs(q)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      console.log(data);
      setUserExpenses(data);
    })
  }, []);

  const signout = () => {
    const auth = getAuth();
    auth.signOut();
    window.location.href = "/";
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <p className="overview-title"><span>B</span>onjour, {user.username}</p>
          <button onClick={signout}>Log out</button>
          <div className="overview-balance-container">
            <p className="overview-balance-container-title"><span>V</span>os dépenses de {monthNames[new Date().getMonth()].toString()}</p>
            <p className="overview-balance-container-value">537.21 <span>€</span></p>
          </div>

          <div className="overview-expenses-container">
            {
              userExpenses !== null ?
              userExpenses.map((expense: any, index: any) => {
                return(
                  <MoneyCard key={index} title={expense.market_name} date={new Date(expense.expense_date.seconds)} amount={expense.expense_amount}/>
                )
              })
              :
              <p>Aucunes depense</p>
            }
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default Overview;
